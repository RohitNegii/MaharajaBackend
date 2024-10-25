import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

const router = express.Router();

// Define routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory); // Image handling is done in the controller
router.put("/:id", updateCategory); // Image handling is done in the controller
router.delete("/:id", deleteCategory);

export default router;
