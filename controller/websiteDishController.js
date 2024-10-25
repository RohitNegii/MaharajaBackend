import Dish from "../model/dish.js";
import { successResponse, errorResponse } from "../views/responseHandler.js";
import Category from "../model/category.js"; // Ensure this imports the correct model
import DishCategory from "../model/category.js"; // Assuming DishCategory is exported from the same file

export const getDishByShowDishHomePage = async (req, res) => {
  try {
    // Get the dish type from query parameters
    const { type } = req.query;
    console.log(type);

    // Validate the type parameter
    if (!type || typeof type !== "string") {
      return res
        .status(400)
        .json({ message: "Dish type is required and must be a string" });
    }

    // Fetch dishes matching the given type and showDishToHomePage = true, limited to 10
    const dishes = await Dish.find({
      type: type.trim(), // Match the dish type
      showDishToHomePage: true, // Only fetch dishes that should be shown on the home page
    })
      .limit(10)
      .populate("category");

    successResponse(res, dishes); // Use successResponse helper for consistency
  } catch (error) {
    errorResponse(res, "Server error", 500);
  }
};

export const searchDishes = async (req, res) => {
  console.log("Searching dishes");
  try {
    // Get category ID and dish type from query parameters
    const { categoryId, type } = req.query;
    console.log(`Category ID: ${categoryId}, Type: ${type}`);

    // Validate parameters
    if (!categoryId || !type || typeof type !== "string") {
      return res.status(400).json({
        message:
          "Category ID and dish type are required and type must be a string",
      });
    }

    // Fetch the category details
    const category = await Category.findById(categoryId.trim());
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch dishes matching the given category ID and type
    const dishes = await Dish.find({
      category: categoryId.trim(), // Match the category ID
      type: type.trim(), // Match the dish type
      showDishToHomePage: true, // Only fetch dishes that should be shown on the home page
    }).limit(10);

    // Create a response object with the category and its corresponding dishes
    const response = {
      category: {
        _id: category._id,
        name: category.name,
        description: category.description,
        logo: category.logo,
        image: category.image,
        // You can include other category details here as needed
      },
      dishes: dishes.map((dish) => ({
        _id: dish._id,
        name: dish.name,
        price: dish.price,
        description: dish.description,
        // Include other dish details as needed
      })),
    };

    successResponse(res, response); // Use successResponse for consistency
  } catch (error) {
    errorResponse(res, "Server error", 500);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await DishCategory.find(); // Fetch all categories
    successResponse(res, categories); // Send the categories as a JSON response
  } catch (error) {
    errorResponse(res, "Server Error", 500); // Handle any errors
  }
};
