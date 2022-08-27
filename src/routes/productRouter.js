'use-strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/getAllProducts', controller.get);
router.get('/getById/:id', controller.getById);
router.get('/getBySlug/:slug', controller.getBySlug);
router.get('/getByTag/:tag', controller.getByTag);
router.post('/new-product', controller.post);
router.put('/update-product/:id', controller.put);
router.delete('/remove-product', controller.delete);

module.exports = router;