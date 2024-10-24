const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    logo: { type: String }, // Path to the logo image
    image: { type: String }, // Path to the category image
  },

  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("DishCategory", categorySchema);
