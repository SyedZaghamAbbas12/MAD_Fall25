import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import tableRoutes from "./routes/table.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/order.js";
import reservationRoutes from "./routes/reservation.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect DB (safe for Vercel if cached in db.js)
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is live 🚀"
  });
});

// ❌ DO NOT use app.listen() on Vercel
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ✅ Export app for Vercel
export default app;
