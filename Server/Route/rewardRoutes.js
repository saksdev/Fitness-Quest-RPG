const express = require('express');
const router = express.Router();
const { getRewardStatus, claimLoot, claimDailyReward } = require('../controller/RewardController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/status', isAuthenticated, getRewardStatus);
router.post('/claim', isAuthenticated, claimLoot);
router.post('/daily', isAuthenticated, claimDailyReward);

module.exports = router;
