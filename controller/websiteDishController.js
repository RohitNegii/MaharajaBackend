const Dish = require("../model/dish");
const { successResponse, errorResponse } = require("../views/responseHandler");
const Category = require("../model/category");

exports.getDishByShowDishHomePage = async (req, res) => {
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

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.searchDishes = async (req, res) => {
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

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await DishCategory.find(); // Fetch all categories
    res.status(200).json(categories); // Send the categories as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message }); // Handle any errors
  }
};
