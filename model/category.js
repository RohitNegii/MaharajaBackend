import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    logo: { type: String }, // URL for the logo image stored in S3
    image: { type: String }, // URL for the category image stored in S3
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("DishCategory", categorySchema);
