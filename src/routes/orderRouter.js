'use-strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const authService = require('../services/authService');


router.get('/getAllOrders', authService.isAdmin, controller.get);
router.post('/new-order', authService.authorize, controller.post);

module.exports = router;