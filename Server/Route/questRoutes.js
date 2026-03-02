const express = require('express');
const router = express.Router();
const { getQuests, claimQuestReward } = require('../controller/QuestController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', isAuthenticated, getQuests);
router.post('/claim/:questId', isAuthenticated, claimQuestReward);

module.exports = router;
