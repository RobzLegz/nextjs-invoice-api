export const formatPrice = (price: number) => {
  const fPrice = Math.round(price * 100) / 100;

  return fPrice;
};
