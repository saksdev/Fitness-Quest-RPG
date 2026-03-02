const User = require('../models/User');

const getLeaderboard = async (req, res) => {
    try {
        const userId = req.userId; // Provided by isAuthenticated middleware

        // 1. Get top 50 champions
        const champions = await User.find({}, 'name username XP level profilePicture gold')
            .sort({ XP: -1 })
            .limit(50);

        // 2. Find requesting user's rank
        const currentUser = await User.findById(userId, 'XP username name level profilePicture gold');

        let userRank = null;
        if (currentUser) {
            // Rank is (number of people with more XP) + 1
            userRank = await User.countDocuments({ XP: { $gt: currentUser.XP } }) + 1;
        }

        res.status(200).json({
            success: true,
            data: champions,
            userRank: userRank,
            currentUser: currentUser
        });
    } catch (err) {
        console.error('Leaderboard Fetch Error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to summon the champions. Try again later.'
        });
    }
};

module.exports = { getLeaderboard };
