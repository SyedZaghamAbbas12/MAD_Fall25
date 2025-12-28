import Order from "../models/Order.js";
import Table from "../models/Table.js";

// Place order
export const createOrder = async (req, res) => {
  try {
    const { tableId, items, discount = 0, totalAmount } = req.body;

    if (!tableId || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Missing required order data" });
    }

    // Create the order
    const order = await Order.create({ tableId, items, discount, totalAmount });

    // Update table status
    await Table.findByIdAndUpdate(tableId, { status: "Occupied", currentOrderId: order._id });

    // Optional: send to kitchen printer
    // Uncomment if printer module exists
    // import { sendToKitchenPrinter } from "../utils/printer.js";
    // sendToKitchenPrinter(order);

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// Complete order
export const completeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ message: "Order ID required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Completed";
    await order.save();

    // Free the table
    await Table.findByIdAndUpdate(order.tableId, { status: "Available", currentOrderId: null });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to complete order" });
  }
};

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("tableId")
      .populate("items.itemId");
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
