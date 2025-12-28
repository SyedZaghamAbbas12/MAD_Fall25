export const getTables = async () => {
  return Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);
};
