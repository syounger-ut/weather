const getTodaysDate = jest.fn().mockReturnValue("1066-01-02");
const dateStartEndSeconds = jest.fn().mockReturnValue({ start: 123, end: 321 });

module.exports = { getTodaysDate, dateStartEndSeconds };
