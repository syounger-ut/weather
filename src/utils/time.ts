export const getTodaysDate = (): string => {
  const yourDate = new Date();
  return yourDate.toISOString().split('T')[0];
};

export const dateStartEndSeconds = (date: Date): { start: number, end: number } => {
  const startTime = Math.floor(date.setHours(0, 0, 0, 0) / 1000);
  const endTime = Math.floor(date.setHours(23, 59, 59, 999) / 1000)
  return { start: startTime, end: endTime };
};