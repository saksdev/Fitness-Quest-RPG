// api/UserDashboard.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { isAuthenticated } = require('../middlewares/auth');

// Renaming for backward compatibility if needed, but better to just use isAuthenticated
const authenticateToken = isAuthenticated;

// API endpoint to fetch user data
const getUserDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    const userData = {
      userId: user._id,
      name: user.name,
      // Add other fields as needed
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authenticateToken, getUserDashboardData };
