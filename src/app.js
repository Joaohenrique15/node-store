'use-strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/NodeStr');

//Carrega as models
const Product = require('./models/product');

//Carrega as rotas
const index = require('./routes/index')
const products = require('./routes/productRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/products', products);

module.exports = app;
