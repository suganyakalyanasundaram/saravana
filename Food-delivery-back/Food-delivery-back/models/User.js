const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Oh Come on! name is must!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "enter the email"],
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  password: {
    type: String,
    minimum: 6,
    required: [true, "enter password minimun 6"],
  },
  address: {
    type: String,
  },
  role_id: {
    type: Number,
  },
  created_date: {
    type: Date,
  },
  last_active: {
    type: Date,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

// category_id: {
//   type: String,
// },

// yag object ID baidlaar normalized holbolt hiisen tohioldold

// category_id:[{
//   type: Schema.Types.ObjectId,
//   ref: 'food_category'
// }],
