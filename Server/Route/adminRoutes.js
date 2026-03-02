const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');
const { getAllUsers, getSystemStats } = require('../controller/AdminController');

// All routes here are protected by Auth and Admin middleware
router.get('/users', isAuthenticated, isAdmin, getAllUsers);
router.get('/stats', isAuthenticated, isAdmin, getSystemStats);

module.exports = router;
