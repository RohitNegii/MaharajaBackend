const fs = require("fs");
const path = require("path");
const Category=require("../model/category")
const { successResponse, errorResponse } = require("../views/responseHandler");

// Helper function to save Base64 image
const saveBase64Image = (base64Image, folderPath) => {
  return new Promise((resolve, reject) => {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}.png`;
    const filePath = path.join(__dirname, "..", "public", folderPath, fileName);

    fs.writeFile(filePath, base64Data, "base64", (err) => {
      if (err) return reject(err);
      resolve(`${folderPath}/${fileName}`);
    });
  });
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    successResponse(res, categories);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return errorResponse(res, "Category not found", 404);
    successResponse(res, category);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, logo, image } = req.body;

    const categoryData = {
      name,
      description,
    };

    if (logo) {
      categoryData.logo = await saveBase64Image(logo, "uploads/logos");
    }

    if (image) {
      categoryData.image = await saveBase64Image(image, "uploads/images");
    }

    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    successResponse(res, savedCategory, 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return errorResponse(res, "Category not found", 404);

    const { name, description, logo, image } = req.body;

    if (name) category.name = name;
    if (description) category.description = description;

    if (logo) {
      category.logo = await saveBase64Image(logo, "uploads/logos");
    }

    if (image) {
      category.image = await saveBase64Image(image, "uploads/images");
    }

    const updatedCategory = await category.save();
    successResponse(res, updatedCategory);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return errorResponse(res, "Category not found", 404);

    await category.remove();
    successResponse(res, "Category deleted successfully");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
