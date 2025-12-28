import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  items: [{ itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }, quantity: Number }],
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending","Completed"], default: "Pending" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
