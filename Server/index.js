require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/dbconnection');
const { authenticateToken, getUserDashboardData } = require('./Route/UserDashboard');
const { isAuthenticated } = require('./middlewares/auth');
const { handleError } = require('./utils/errorhandler');
const corsMiddleware = require('./config/corsConfig');
const signupController = require('./controller/SignupController');
const loginController = require('./controller/LoginController');
// const contactController = require('./controller/contactController');
const profileRoutes = require('./Route/profileRoutes');
// const settingsRoutes = require('./Route/settingsRoutes.js');
const uploadRoutes = require('./Route/uploadRoutes');
const { logoutHandler } = require('./Route/Logout');
const publicProfileRoutes = require('./Route/publicProfile');
const dashboardFitbit = require('./Route/dashboardfitbit.js');
// const forgotPasswordController = require('./controller/ForgotPasswordController');

const app = express();
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());

// Use the public profile routes
app.use('/api', publicProfileRoutes);

// Signup route
app.post('/signup', signupController.signup);

// Login route
app.post('/login', loginController.login);

// Logout route
app.post('/logout', isAuthenticated, logoutHandler);

// Contact route - Moved to third-party service (EmailJS)

// Forgot Password routes
// app.post('/forgot-password', forgotPasswordController.forgotPassword);
// app.post('/reset-password', forgotPasswordController.resetPassword);

// Auth check route
app.get('/auth', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
});

// Profile routes - for viewing profile and updating game-related data
app.use('/api/profile', isAuthenticated, (req, res, next) => {
    console.log('Profile route accessed. User ID:', req.userId);
    next();
}, profileRoutes);

// Settings routes - for updating profile information
// app.use('/api/settings', isAuthenticated, settingsRoutes);

// Upload routes
app.use('/api/profile', isAuthenticated, uploadRoutes);

// Protected dashboard route
app.get('/dashboard', authenticateToken, getUserDashboardData);

// Use dashboard routes
app.use('/api/dashboard', dashboardFitbit);

// Error handling middleware
app.use((err, req, res, next) => {
    handleError(err, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Root route to show the server is up
app.get('/', (req, res) => {
    res.status(200).send('Fitness Quest API Server is running happily! 🚀');
});




// Health check route for Uptime Monitoring (Cron-job)
app.get('/health', async (req, res) => {
    try {
        const mongoose = require('mongoose');
        // A simple ping to the database to ensure it's still connected and awake
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.db.admin().ping();
            res.status(200).json({ status: 'ok', database: 'connected' });
        } else {
            res.status(503).json({ status: 'error', database: 'disconnected' });
        }
    } catch (error) {
        console.error('Health check database ping failed:', error);
        res.status(500).json({ status: 'error', database: 'error' });
    }
});