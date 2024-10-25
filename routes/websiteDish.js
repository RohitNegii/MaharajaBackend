import express from "express";
const router = express.Router();

import {
  getDishByShowDishHomePage,
  searchDishes,
  getAllCategories,
} from "../controller/websiteDishController.js";

// Define routes
router.get("/getDishByShowDishHomePage", getDishByShowDishHomePage);
router.get("/allDishes", searchDishes);
router.get("/allCategory", getAllCategories);

export default router;
