'use-strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

mongoose.connect(config.connectionString);

//Carrega as models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as rotas
const index = require('./routes/index')
const products = require('./routes/productRouter')
const customers = require('./routes/customerRouter')
const orders = require('./routes/orderRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/products', products);
app.use('/customers', customers);
app.use('/orders', orders);

module.exports = app;
