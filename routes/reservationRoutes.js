import express from "express";
import {
  createReservation,
  deleteReservation,
  getReservations,
} from "../controller/reservationController.js";

const router = express.Router();

// Define routes
router.post("/reserve", createReservation);
router.get("/reservations", getReservations);
router.delete("/reservations/:id", deleteReservation);

export default router;
