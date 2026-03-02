const express = require('express');
const router = express.Router();
const { getShopItems, purchaseItem } = require('../controller/ShopController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/items', isAuthenticated, getShopItems);
router.post('/buy', isAuthenticated, purchaseItem);

module.exports = router;
