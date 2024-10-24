const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  numberOfPeople: Number,
  phoneNumber: String,
  email: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;

