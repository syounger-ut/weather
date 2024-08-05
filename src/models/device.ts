class Device {
  public observations: Observation[] = [];

  public status?: Status;

  public constructor(
    public deviceId: number,
    public type: string,
    public source: string,
  ) {}

  public addObservation(observation: Observation): void {
    this.observations.push(observation);
  }

  public addStatus(status: Status): void {
    this.status = status;
  }

  public toJson(): string {
    return JSON.stringify({
      deviceId: this.deviceId,
      type: this.type,
      source: this.source,
      observations: this.observations,
      status: this.status,
    });
  }
}