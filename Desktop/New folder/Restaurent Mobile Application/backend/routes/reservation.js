import express from "express";
import { createReservation, getReservations } from "../controllers/reservationController.js";
import { protect } from "../config/auth.js";

const router = express.Router();
router.post("/", protect, createReservation);
router.get("/", protect, getReservations);

export default router;
