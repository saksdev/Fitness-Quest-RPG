const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controller/LeaderboardController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/leaderboard', isAuthenticated, getLeaderboard);

module.exports = router;
