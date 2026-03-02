const User = require('../models/User');

// Get all users with their key stats
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Get System Stats
const getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalXPCheck = await User.aggregate([{ $group: { _id: null, total: { $sum: "$XP" } } }]);
        const totalXP = totalXPCheck.length > 0 ? totalXPCheck[0].total : 0;

        // Calculate total steps tracked across all users
        // This requires unwinding dailyStats
        const totalStepsCheck = await User.aggregate([
            { $unwind: "$dailyStats" },
            { $group: { _id: null, total: { $sum: "$dailyStats.steps" } } }
        ]);
        const totalSteps = totalStepsCheck.length > 0 ? totalStepsCheck[0].total : 0;

        res.json({
            totalUsers,
            totalXP,
            totalSteps
        });
    } catch (error) {
        console.error('Error fetching system stats:', error);
        res.status(500).json({ message: 'Error fetching system stats' });
    }
};

module.exports = { getAllUsers, getSystemStats };
