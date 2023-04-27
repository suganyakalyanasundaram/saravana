const { validationResult } = require("express-validator");
const Food = require("../models/food");
const { default: mongoose } = require("mongoose");
function get_foods(req, res) {
  Food.find({}, function (err, data) {
    if (err) res.json({ success: false, data: error });
    else res.json({ success: true, data: data });
  });
}
function food(req, res) {
  const data = req.body;
  const id = req.params.id;
  Food.find({ _id: id }, function (err, data) {
    if (err) res.json({ success: false, data: err });
    else res.json({ success: true, data: data });
  });
}
function create_food(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  } else {
    const data = req.body;
    Food.create(data, function (err, data) {
      if (err) res.json({ success: false, data: err });
      else res.json({ success: true, data: data });
    });
  }
}
function create_foods(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  } else {
    const data = req.body;
    Food.insertMany(data, function (err, data) {
      if (err) res.json({ success: false, data: err });
      else res.json({ success: true, data: data });
    });
  }
}
function updatefood(req, res) {
  const data = req.body;
  const id = req.params.id;
  console.log(req.params.id);
  Food.updateOne({ _id: id }, data, function (err, data) {
    if (err) res.json({ success: false, data: err });
    else res.json({ success: true, data: data });
  });
}
function deletefood(req, res) {
  const id = req.param.id;
  Food.deleteOne({ _id: id }, function (err, data) {
    if (err) res.json({ success: false, data: data });
    else res.json({ success: true, data: " data deleted" });
  });
}
function food_search(req, res) {
  const name = req.query.name;

  var id = mongoose.Types.ObjectId(req.query.id);
  var number;
  var price = req.query.price;
  if (price) {
    number = price;
  } else {
    console.log("kk");
  }
  console.log(name);

  Food.find(
    {
      $or: [
        { name: name },
        { _id: id },
        { price: number },
        { "category.name": name },
      ],
    },
    function (err, data) {
      if (err) res.json({ success: false, data: err });
      else res.json({ success: true, data: data });
    }
  );
}
module.exports = {
  get_foods,
  food,
  create_food,
  updatefood,
  deletefood,
  create_foods,
  food_search,
};
