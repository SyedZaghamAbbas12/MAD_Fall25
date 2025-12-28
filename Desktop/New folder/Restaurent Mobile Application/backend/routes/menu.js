import express from "express";
import { getMenuItems } from "../controllers/menuController.js";
import { protect } from "../config/auth.js";

const router = express.Router();
router.get("/", protect, getMenuItems);

export default router;
