'use-strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get('/getToken', controller.authenticate);
router.get('/refreshToken', controller.refreshToken);

router.get('/getById/:id', controller.getById);
router.get('/getByEmail/:email', controller.getbyEmail);
router.post('/new-customer', controller.post);

module.exports = router;