const formatDateToString = jest.fn().mockReturnValue("year=1066/month=01/day=02/hour=23/");
const dateStartEndSeconds = jest.fn().mockReturnValue({ start: 123, end: 321 });
const unixToDateTime = jest.fn().mockReturnValue(new Date(1234567890 * 1000));

module.exports = { formatDateToString, dateStartEndSeconds, unixToDateTime };
