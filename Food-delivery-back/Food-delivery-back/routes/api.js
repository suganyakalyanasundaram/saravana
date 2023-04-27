const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const User = require("../models/user");
const order = require("../models/order");
const middleware = require("../middleware/create_update");
const foodController = require("../controller/foodController");
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");
const auth = require('../middleware/auth')

router.get("/foods", foodController.get_foods);
router.post("/createfood", middleware.createfood(), foodController.create_food);
router.post("/updatefood/:id", foodController.updatefood);
router.get("/deletefood/:id", foodController.deletefood);
router.get("/food/:id", foodController.food);
router.use("/createfoods", foodController.create_food);
router.get("/foodsearch", foodController.food_search);

router.get("/users", userController.get_users);
router.get("/user/:id", userController.user);
router.post(
  "/createuser",
  middleware.createuser(),
  userController.create_users
);
router.post("/updateuser/:id", userController.updateUser);
router.get("/usersearch", userController.user_search);
router.get("/deleteuser/:id", userController.delete_user);


router.get("/orders", orderController.get_orders);
router.post(
  "/createorder",
  middleware.createorders(),
  orderController.create_orders
);
router.get("/deleteorder/:id", orderController.delete_order);
router.post("/updateorder/:id", orderController.update_order);

module.exports = router;
