class MockStorage {
  public directoryExists = jest.fn().mockResolvedValue(true);

  public createDirectory = jest.fn().mockResolvedValue({});

  public createObject = jest.fn().mockResolvedValue({});
}

module.exports = { Storage: MockStorage };
