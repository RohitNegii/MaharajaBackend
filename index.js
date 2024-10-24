require("dotenv").config(); // Ensure to load environment variables

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./config/dbConnect"); // Adjusted import statement
const categoryRoutes = require("./routes/categoryRoutes"); // Adjusted import statement
const dishRoutes = require("./routes/dish"); // Adjusted import statement
const webRoutes = require("./routes/websiteDish"); // Adjusted import statement

const path = require("path"); // Import the path module

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "10mb" })); // Increase the limit as needed
app.use(cors()); // Enable CORS for cross-origin requests

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
dbConnect();

// Define your API routes
app.use("/api/categories", categoryRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api", webRoutes);
app.use("/api", require("./routes/reservationRoutes"));
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

// Handle database connection events
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
