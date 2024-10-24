const express = require("express");
const router = express.Router();

const {
  getDishByShowDishHomePage,
  searchDishes,
  getAllCategories,
} = require("../controller/websiteDishController");

router.get("/getDishByShowDishHomePage", getDishByShowDishHomePage);

router.get("/allDishes", searchDishes);
router.get("/allCategory", getAllCategories);

module.exports = router;
