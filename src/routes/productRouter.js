'use-strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/getAllProducts', controller.get);
router.post('/new-product', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;