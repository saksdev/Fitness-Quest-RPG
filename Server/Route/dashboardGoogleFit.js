const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// Exchange code for tokens
async function exchangeCodeForTokens(code) {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.GOOGLE_CLIENT_ID);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    params.append('redirect_uri', process.env.GOOGLE_CALLBACK_URL);
    params.append('grant_type', 'authorization_code');

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error exchanging google code for tokens:', error.response?.data || error.message);
        throw error;
    }
}

// Initiate Google Fit connection
router.get('/connect-google-fit', isAuthenticated, (req, res) => {
    console.log('Initiating Google Fit connection for user:', req.userId);
    const state = req.userId;
    const scopes = [
        'https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.body.read' // for calories/weight if needed
    ].join(' ');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&scope=${encodeURIComponent(scopes)}&state=${state}&access_type=offline&prompt=consent`;

    res.redirect(authUrl);
});

// Google Fit Callback
router.get('/google-fit/callback', async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        console.error('Error in Google Fit callback:', error);
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard?google_connection=failed&error=${encodeURIComponent(error)}`);
    }

    try {
        if (!code) throw new Error('No authorization code received from Google');

        const tokens = await exchangeCodeForTokens(code);
        const userId = state; // We passed userId as state

        if (!userId) throw new Error('No user ID found in state parameter');

        // Verify tokens or just save them. Google doesn't always return a user_id in the token response directly in the same way, 
        // usually we'd call userinfo, but for Fitness API we just need the access token.
        // We'll save the tokens.

        await User.findByIdAndUpdate(userId, {
            googleFitAccessToken: tokens.access_token,
            googleFitRefreshToken: tokens.refresh_token, // Only if access_type=offline
            // googleFitUserId: ... we might not get a distinct ID here easily without another call
        });

        res.redirect(`${process.env.FRONTEND_URL}/dashboard?google_connection=success`);
    } catch (error) {
        console.error('Error in Google Fit callback:', error);
        res.redirect(`${process.env.FRONTEND_URL}/dashboard?google_connection=failed&error=${encodeURIComponent(error.message)}`);
    }
});

// Check Google Fit status
router.get('/google-fit-status', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ isConnected: !!user?.googleFitAccessToken });
    } catch (error) {
        res.status(500).json({ message: 'Error checking Google Fit status' });
    }
});

// Fetch Google Fit Data (Simple Step Count for "Today")
router.get('/google-fit-data', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user || !user.googleFitAccessToken) {
            return res.status(400).json({ message: 'Google Fit not connected' });
        }

        // Google Fit uses a weird "Aggregate" endpoint
        // For simplicity, let's try to get estimated steps for today
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0)).getTime();
        const endOfDay = new Date(now.setHours(23, 59, 59, 999)).getTime();

        const response = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
            aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
            bucketByTime: { durationMillis: 86400000 }, // 1 day
            startTimeMillis: startOfDay,
            endTimeMillis: endOfDay
        }, {
            headers: { Authorization: `Bearer ${user.googleFitAccessToken}` }
        });

        // Parse that complex response...
        // This is a placeholder. Real parsing depends on exact Google structure.
        // Assuming success for now.
        const steps = response.data?.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;

        res.json({ steps });

    } catch (error) {
        console.error('Error fetching Google Fit data:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching Google Fit data' });
    }
});

module.exports = router;
