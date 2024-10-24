const express = require("express");
const router = express.Router();

const {
  createReservation,
  deleteReservation,
  getReservations,
} = require("../controller/reservationController");

router.post("/reserve", createReservation);

router.get("/reservations", getReservations);
router.delete("/reservations/:id", deleteReservation);



module.exports = router;
