export const containsId = (products, id) => {
  for (const product of products) {
    if (product.id === id) {
      return true;
    }
  }
  return false;
};
