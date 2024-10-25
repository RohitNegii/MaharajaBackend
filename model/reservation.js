import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  numberOfPeople: Number,
  phoneNumber: String,
  email: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
