'use-strict'

const ValidationContract = require('../validators/fluentValidator');
const repository = require("../repositories/customerRepository");


exports.getById = async (req, res, next) => {
    try {

        var data = await repository.getById(req.params.id);
        
        if (data == null || data == undefined) {
            res.status(404).send({
                message: 'Cliente não localizado'
            });

            return;
        }

        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            Error: e
        });
    }
}


exports.getbyEmail = async (req, res, next) => {
    try {
        var data = await repository.getbyEmail(req.params.email);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            Error: e
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Email invalido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            Error: e
        });
    }

};