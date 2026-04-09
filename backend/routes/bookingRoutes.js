import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();
router.get("/", async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});
router.post("/create", async (req, res) => {
    const booking = await Booking.create(req.body);
    res.json(booking);
});
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(booking);
});
export default router;