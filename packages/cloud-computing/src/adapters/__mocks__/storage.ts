export class Storage {
  public directoryExists = jest.fn().mockReturnValue(new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  }));

  public createDirectory = jest.fn().mockResolvedValue({});

  public createObject = jest.fn().mockResolvedValue({});
}
