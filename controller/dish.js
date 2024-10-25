import Dish from "../model/dish.js";
import { successResponse, errorResponse } from "../views/responseHandler.js";

// Get all dishes
export const getAllDishes = async (req, res) => {
  console.log("Fetching all dishes");

  try {
    const dishes = await Dish.find().populate("category", "name"); // Populate category name
    successResponse(res, dishes);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get dish by ID
export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!dish) return errorResponse(res, "Dish not found", 404);
    successResponse(res, dish);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Create a new dish
export const createDish = async (req, res) => {
  try {
    const newDish = new Dish({
      name: req.body.name,
      category: req.body.categoryId,
      type: req.body.type, // Expecting an array of dish types
      number: req.body.number,
      description: req.body.description,
      price: req.body.price,
      showDishToHomePage: req.body.showDishToHomePage || false, // Handle showDishToHomePage
    });
    const savedDish = await newDish.save();
    successResponse(res, savedDish, 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Update a dish
export const updateDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return errorResponse(res, "Dish not found", 404);

    dish.name = req.body.name || dish.name;
    dish.category = req.body.categoryId || dish.category;
    dish.type = req.body.type || dish.type; // Expecting an array of dish types
    dish.number = req.body.number || dish.number;
    dish.description = req.body.description || dish.description;
    dish.price = req.body.price || dish.price;
    dish.showDrinks = req.body.showDrinks;
    dish.showToopins = req.body.showToopins;
    dish.showDishToHomePage =
      req.body.showDishToHomePage !== undefined
        ? req.body.showDishToHomePage
        : dish.showDishToHomePage;

    console.log(dish, "dish");

    const updatedDish = await dish.save();
    successResponse(res, updatedDish);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Delete a dish
export const deleteDish = async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    successResponse(res, "Dish deleted successfully");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
