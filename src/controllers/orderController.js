'use-strict'

const repository = require("../repositories/orderRepository");
const guid = require("guid");
const authService = require('../services/authService');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            Error: e
        });
    }
};

exports.post = async (req, res, next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            Error: e
        });
    }

};
