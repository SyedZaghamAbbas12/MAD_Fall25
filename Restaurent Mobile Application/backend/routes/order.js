import express from "express";
import { createOrder, completeOrder, getAllOrders } from "../controllers/orderController.js";
import { protect, adminOnly } from "../config/auth.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.post("/complete", protect, completeOrder);
router.get("/all", protect, adminOnly, getAllOrders);

export default router;
