const { validationResult } = require("express-validator");
const Order = require("../models/order")
function get_orders(req, res) {
    Order.find({}, function (err, data) {
        if (err) res.json({ success: false, data: error });
        else res.json({ success: true, data: data });
    });
}
function create_orders(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    } else {
        const data = req.body
        Order.create(data, function (err, data) {
            if (err) res.json({ success: false, data: err });
            else res.json({ success: true, data: data });
        })

    }
}
function delete_order(req, res) {
    id = req.params.id
    Order.deleteOne({ _id: id }, function (err, data) {
        if (err) res.json({ success: false, data: data });
        else res.json({ success: true, data: " data deleted" })
    })
}
function update_order(req, res) {
    id = req.params.id
    data = req.body
    Order.updateOne({ _id: id }, data, function (err, data) {
        if (err) res.json({ success: false, data: data });
        else res.json({ success: true, data: data })
    })
}

module.exports = {
    get_orders,
    create_orders,
    delete_order,
    update_order
}