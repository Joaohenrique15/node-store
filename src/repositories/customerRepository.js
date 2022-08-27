'use-strict'

const mongoose = require("mongoose");
const Customer = mongoose.model('Customer');

exports.getByEmail = async (email) => {
    const res = await Customer.findOne({
        email: email,
    }, 'name email')

    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById(id, 'name email');
    return res;
}

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}
