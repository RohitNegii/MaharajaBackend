// app.js
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dbConnect from "./config/dbConnect.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dishRoutes from "./routes/dish.js";
import webRoutes from "./routes/websiteDish.js";
import reservationRoutes from "./routes/reservationRoutes.js";

// Path resolution for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
dbConnect();

// API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api", webRoutes);
app.use("/api", reservationRoutes);

// Base route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server is running successfully." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start Server after MongoDB is connected
mongoose.connection.once("open", () => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Handle database connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
