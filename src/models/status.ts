class Status {
  public device?: Device;

  public constructor(
    public statusCode: number,
    public statusMessage: string,
  ) {}

  public addDevice(device: Device): void {
    this.device = device;
  }
}