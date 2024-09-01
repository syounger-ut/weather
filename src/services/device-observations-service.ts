import {Device} from "../models";
import { ObservationsService } from "./observations-service";

export class DeviceObservationsService {
  public constructor(
    private readonly observationsService: ObservationsService,
  ) {}

  public async fetchAndInsertReading(): Promise<{ insertCount: number, reading: Device }> {
    const reading = await this.observationsService.readObservation();
    console.info('reading: ', reading);
    const readingInserts = reading.observations.map(obs => this.observationsService.insertReading(obs, obs.dateTime.toString()));
    const insertResult = await Promise.allSettled(readingInserts);

    return {
      insertCount: insertResult.length,
      reading,
    }
  }
}
