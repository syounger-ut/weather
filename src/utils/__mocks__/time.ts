const formatDateToString = jest.fn().mockReturnValue("1066/01/02/23/");
const dateStartEndSeconds = jest.fn().mockReturnValue({ start: 123, end: 321 });
const unixToDateTime = jest.fn().mockReturnValue(new Date(1234567890 * 1000));

module.exports = { formatDateToString, dateStartEndSeconds, unixToDateTime };
