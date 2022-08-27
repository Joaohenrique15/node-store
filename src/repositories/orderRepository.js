'use-strict'

const mongoose = require("mongoose");
const Order = mongoose.model('Order');


exports.get = async () => {
    const res = await Order
        .find({}, 'number status')
        .populate('customer', 'name email')
        .populate('items.product', 'title description price slug tags');
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}

