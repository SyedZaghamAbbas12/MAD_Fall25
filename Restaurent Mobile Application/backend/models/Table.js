import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
  tableNumber: { type: Number, required: true },
  status: { type: String, enum: ["Available","Occupied","Reserved"], default: "Available" },
  currentOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null }
});

export default mongoose.model("Table", tableSchema);
