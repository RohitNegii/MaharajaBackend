const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(
      `mongodb+srv://Rohit-Negi:${encodeURIComponent(
        "Rohit@123"
      )}@cluster0.3rzcd1u.mongodb.net/maharaja?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
