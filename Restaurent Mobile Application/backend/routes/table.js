import express from "express";
import { getTables, updateTableStatus } from "../controllers/tableController.js";
import { protect } from "../config/auth.js";

const router = express.Router();
router.get("/", protect, getTables);
router.put("/", protect, updateTableStatus);

export default router;
