import Reservation from "../model/reservation.js";

// Fetch all reservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json({ data: reservations });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// Create a reservation
export const createReservation = async (req, res) => {
  try {
    const { name, date, time, numberOfPeople, phoneNumber, email } = req.body;
    const newReservation = new Reservation({
      name,
      date,
      time,
      numberOfPeople,
      phoneNumber,
      email,
    });
    await newReservation.save();
    res.status(201).json({ message: "Reservation created" });
  } catch (error) {
    res.status(400).json({ error: "Error creating reservation" });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
};
