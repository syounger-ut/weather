class Status {
  public device?: Device;

  public constructor(
    public statusCode: number,
    public statusMessage: string,
  ) {}

  public addDevice(device: Device): void {
    this.device = device;
  }

  public toJson(): string {
    return JSON.stringify({
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      device: this.device,
    })
  }
}