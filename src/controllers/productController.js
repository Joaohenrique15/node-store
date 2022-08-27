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
    }, 'title price slug')
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao listar os produtos',
                data: e
            })
        });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id, 'title description price active slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao listar os produtos',
                data: e
            })
        });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao listar os produtos',
                data: e
            })
        });
};

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
        .then(data => {
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

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;    
    }

    product.save()
        .then(x => {
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
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(data => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar o produto',
            data: e
        })
    });
};

exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto',
                data: e
            })
        });
};
