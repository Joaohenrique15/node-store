'use-strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Carrega as rotas
const index = require('./routes/index')
const products = require('./routes/productRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/products', products);

module.exports = app;
