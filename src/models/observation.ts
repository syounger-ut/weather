class Observation {
  public device?: Device;

  public constructor(
    public dateTime: number,
    public windLull: number,
    public windAvg: number,
    public windGust: number,
    public windDirection: number,
    public windSampleInterval: number,
    public pressure: number,
    public airTemperature: number,
    public relativeHumidity: number,
    public illuminance: number,
    public uv: number,
    public solarRadiation: number,
    public rainAccumulation: number,
    public precipitationType: number,
    public avgStrikeDistance: number,
    public strikeCount: number,
    public battery: number,
    public reportInterval: number,
    public localDayRainAccumulation: number,
    public ncRainAccumulation: number,
    public localDayNCRainAccumulation: number,
    public precipitationAnalysis: number,
  ) {}

  public addDevice(device: Device): void {
    this.device = device;
  }
}