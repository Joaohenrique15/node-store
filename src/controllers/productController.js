'use-strict'

const mongoose = require("mongoose");
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluentValidator');
const repository = require("../repositories/productRepository");

/*
O método find busca todos os registros da collection no Mongo
title price e slug, são as propriedades que eu quero que retorne nesse método, removendo o restante das props que estão no mongo 
Active: true - É a condição que eu desejo, só quero os produtos que estão como true
*/

exports.get = (req, res, next) => {
    repository
        .get()
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
    repository
        .get(req.params.id)
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
    repository
        .getBySlug(req.params.slug)
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
    repository
        .getByTag(req.params.tag)
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
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
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
    repository
        .update(req.params.id, req.body)
        .then(data => {
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
    repository
        .delete(req.body.id)
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
