const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DishCategory", // Reference to the DishCategory model
      required: true,
    },
    type: {
      type: [String],
      required: true, // Dish type is now required
    },
    number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true, // Description is now required
    },
    price: {
      type: Number,
      required: true, // Price is now required
    },
    showDishToHomePage: {
      type: Boolean,
      default: false, // New field to indicate whether to show the dish on the home page
    },
    showDrinks: {
      type: Boolean,
      default: false, // New field to indicate whether to show the dish on the home page
    },
    showToopins: {
      type: Boolean,
      default: false, // New field to indicate whether to show the dish on the home page
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
