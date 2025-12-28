import mongoose from "mongoose";

const menuItemSchema = mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  imageURL: String
});

export default mongoose.model("MenuItem", menuItemSchema);
