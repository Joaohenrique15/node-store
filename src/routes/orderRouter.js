'use-strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/getAllOrders', controller.get);
router.post('/new-order', controller.post);

module.exports = router;