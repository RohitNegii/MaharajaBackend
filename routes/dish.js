import express from "express";
import {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from "../controller/dish.js";

const router = express.Router();

// Define routes
router.get("/", getAllDishes);
router.get("/:id", getDishById);
router.post("/", createDish);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

export default router;
