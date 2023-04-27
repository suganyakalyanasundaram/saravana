const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");

function get_users(req, res) {
  User.find({}, function (err, data) {
    if (err) res.json({ success: false, data: error });
    else res.json({ success: true, data: data });
  });
}
function create_users(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  } else {
    const data = req.body;
    User.create(data, function (err, data) {
      if (err) res.json({ success: false, data: err });
      else res.json({ success: true, data: data });
    });
  }
}
function updateUser(req, res) {
  const data = req.body;
  const id = req.param.id;
  User.updateOne({ _id: id }, data, function (err, data) {
    if (err) res.json({ success: false, data: err });
    else res.json({ success: true, data: data });
  });
}
function user(req, res) {
  const data = req.body;
  const id = req.param.id;
  User.find({ _id: id }, data, function (err, data) {
    if (err) res.json({ success: false, data: err });
    else res.json({ success: true, data: data });
  });
}
function delete_user(req, res) {
  const data = req.body;
  const id = req.param.id;

  User.deleteOne({ _id: id }, data, function (err, data) {
    if (err) res.json({ success: false, data: err });
    else res.json({ success: true, data: data });
  });
}
function user_search(req, res) {
  let utas = 0;
  const search = req.query.name;
  let phone = req.query.phone;
  var id = mongoose.Types.ObjectId(req.query.id);
  if (phone) {
    utas = phone;
    console.log(utas);
  } else {
    console.log("bolq baina oo");
  }
  console.log(req.query.name);

  User.find(
    {
      $or: [
        { name: search },
        { _id: id },
        { email: search },
        { address: search },
        { phone: parseInt(utas) },
        { role_id: parseInt(utas) },
      ],
    },
    function (err, data) {
      if (err) res.json({ success: false, data: err });
      else res.json({ success: true, data: data });
    }
  );
}

module.exports = {
  get_users,
  user,
  create_users,
  updateUser,
  user_search,
  delete_user,
};
