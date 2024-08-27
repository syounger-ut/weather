export const getTodaysDate = (): string => {
  const yourDate = new Date();
  return yourDate.toISOString().split('T')[0];
}