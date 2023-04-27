const { body, validationResult } = require("express-validator");

const createfood = () => {
  return [
    body("name").notEmpty().withMessage("name is empty"),
    body("price").isNumeric().notEmpty().withMessage("price is empty"),
    body("discount")
      .isNumeric()
      .isLength({ min: 0, max: 100 })
      .withMessage("discount is empty or numeric"),
    body("stock")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("stock is empty numeric min 1"),
    body("category.name").notEmpty().withMessage("category.name is empty"),
  ];
};

const createuser = () => {
  return [
    body("name").notEmpty().withMessage("name is empty"),
    body("email").notEmpty().withMessage("email is empty"),
    body("phone")
      .isNumeric()
      .isLength({ min: 8, max: 15 })
      .withMessage("phone is empty or min:8"),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("password is empty numeric min :6"),
    body("address").notEmpty().withMessage("address is empty"),
    body("role_id").notEmpty().withMessage("role_id is empty or or number"),
    body("created_date")
      .notEmpty()
      .withMessage("created_Date is not empthy string"),
  ];
};
const createorders = () => {
  return [
    body("status")
      .notEmpty()
      .isNumeric()
      .withMessage("status is notempty and numeric"),
    body("user_id")
      .notEmpty()
      .withMessage("user_id notempty or ObjectId user "),
    body("total_price")
      .notEmpty()
      .isNumeric()
      .withMessage("total price is notempty or numeric"),
    body("payment_type")
      .notEmpty()
      .isNumeric()
      .withMessage("payment_type is notempty or numeric"),
    body("deliverman_id")
      .notEmpty()
      .isString()
      .withMessage("deliverman_id is notempty or string"),
    body("created_date")
      .notEmpty()
      .isDate()
      .withMessage("created_date is date and notempty"),
    body("order_detail.food_id")
      .notEmpty()
      .withMessage("food_id is food ees id avah ystoi"),
    body("order_detail.quantity")
      .notEmpty()
      .isNumeric()
      .withMessage("quantity is numeric and notempty"),
    body("order_detail.price")
      .notEmpty()
      .isNumeric()
      .withMessage("price is numeric and notempty"),
  ];
};
exports.createfood = createfood;
exports.createuser = createuser;
exports.createorders = createorders;
