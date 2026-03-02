const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// Helper to sync Fitbit data automatically
const syncFitbitData = async (user) => {
  if (!user.fitbitAccessToken) return null;
  try {
    // Get 7 days of data
    const stepsResponse = await axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json', {
      headers: { Authorization: `Bearer ${user.fitbitAccessToken}` }
    });

    // We might want calories too, but let's stick to steps for the graph for now or make another call
    // const caloriesResponse = await axios.get('https://api.fitbit.com/1/user/-/activities/calories/date/today/7d.json', ...);

    const stepsData = stepsResponse.data?.["activities-steps"] || [];

    let totalNewXP = 0;
    let totalNewGold = 0;

    // Process each day
    stepsData.forEach(dayData => {
      const date = new Date(dayData.dateTime);
      const steps = parseInt(dayData.value || 0);

      // Check if we already have stats for this date
      const existingStatIndex = user.dailyStats.findIndex(stat =>
        stat.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
      );

      // Simple RPG calculation per day
      const dailyXP = Math.floor(steps * 0.5);

      if (existingStatIndex > -1) {
        // Update existing
        user.dailyStats[existingStatIndex].steps = steps;
        user.dailyStats[existingStatIndex].xpGained = dailyXP;
      } else {
        // Add new
        user.dailyStats.push({
          date: date,
          steps: steps,
          xpGained: dailyXP
        });
      }
    });

    // Recalculate Totals based on ALL history (or just add the delta if we were tracking strictly)
    // For now, let's keep the user.XP as a running total, but maybe we should re-sum it from dailyStats + quests? 
    // To be safe and simple: We just update the latest "today" values or rely on the total steps provided by Fitbit if available.
    // BUT, the previous logic replaced user.XP entirely. Let's keep a running total logic or just sum up dailyStats for "Step XP".
    // Let's stick to the previous simple logic for TOTALS for now, but allow dailyStats to populate for the graph.

    const todaySteps = parseInt(stepsData[stepsData.length - 1]?.value || 0);
    const newXP = Math.floor(todaySteps * 0.5); // This logic is a bit flawed if it resets every day. 
    // BETTER LOGIC: Just Save the dailyStats. The Frontend can sum them up or we rely on quests for big XP.
    // Let's not reset user.XP here to avoid losing Quest XP. 
    // We will just award XP for *new* steps if we tracked "last sync steps". 
    // For simplicity of this "demo": We won't touch user.XP here to avoid breaking it, 
    // but we WILL save the history for the graph.

    await user.save();

    return { steps: todaySteps };
  } catch (error) {
    console.error('Auto-sync failed:', error.message);
    return null;
  }
};

// API endpoint to fetch user data
const getUserDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Trigger Automatic Sync
    const syncResult = await syncFitbitData(user);

    // Sort dailyStats by date
    const sortedStats = user.dailyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Return the user data
    const userData = {
      userId: user._id,
      name: user.name,
      xp: user.XP,
      level: user.level,
      gold: user.gold,
      inventory: user.inventory,
      description: user.description,
      lastSync: user.updatedAt,
      dailyStats: sortedStats, // Return specific history
      isSynced: !!syncResult,
      isFitbitConnected: !!user.fitbitAccessToken,
      isGoogleFitConnected: !!user.googleFitAccessToken,
      role: user.role // Return user role for frontend permission checks
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authenticateToken, getUserDashboardData };
