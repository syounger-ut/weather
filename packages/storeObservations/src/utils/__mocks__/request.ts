const request = jest.fn().mockImplementation(() => {
  return jest.fn().mockResolvedValue({ foo: 'bar'});
});

module.exports = { request }
