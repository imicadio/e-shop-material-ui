export const discountPrice = (price, discount) => (price - price * (discount / 100)).toFixed(2);
