export const formatEUR = (amount: number) => {
  const currencyFormatter = new Intl.NumberFormat('en-En', {
    style: 'currency',
    currency: 'EUR',
  });
  return currencyFormatter.format(amount);
};
