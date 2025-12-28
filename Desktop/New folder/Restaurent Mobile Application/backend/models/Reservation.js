import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  time: String
});

export default mongoose.model("Reservation", reservationSchema);
