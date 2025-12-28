import MenuItem from "../models/MenuItem.js";

export const getMenuItems = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};
