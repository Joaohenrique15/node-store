'use-strict'

const mongoose = require("mongoose");
const Product = mongoose.model('Product');

/*
O método find busca todos os registros da collection no Mongo
title price e slug, são as propriedades que eu quero que retorne nesse método, removendo o restante das props que estão no mongo 
Active: true - É a condição que eu desejo, só quero os produtos que estão como true
*/

exports.get = (req, res, next) => {
    Product.find({
        active: true
    }, 'title price slug').then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send({
            message: 'Erro ao listar os produtos',
            data: e
        })
    });
};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id, item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
