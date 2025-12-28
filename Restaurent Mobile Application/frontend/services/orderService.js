export const createOrder = async ({ table, items }) => {
  return { success: true };
};

export const getOrdersHistory = async () => {
  return [
    { id: 1, table: 'Table 1', items: [{ id: 1, name: 'Pizza', price: 10, quantity: 2 }] },
  ];
};

export const getSalesReports = async () => {
  return [
    { date: '2025-12-21', totalSales: 100 },
  ];
};
