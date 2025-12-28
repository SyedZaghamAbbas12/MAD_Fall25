import Table from "../models/Table.js";

export const getTables = async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
};

export const updateTableStatus = async (req, res) => {
  const { tableId, status, orderId } = req.body;
  const table = await Table.findById(tableId);
  if (!table) return res.status(404).json({ message: "Table not found" });
  table.status = status;
  table.currentOrderId = orderId || null;
  await table.save();
  res.json(table);
};
