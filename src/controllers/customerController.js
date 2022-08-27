'use-strict'

const ValidationContract = require('../validators/fluentValidator');
const repository = require("../repositories/customerRepository");
const md5 = require('md5');
const authService = require('../services/authService');


const emailService = require('../services/emailService')

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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

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

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
