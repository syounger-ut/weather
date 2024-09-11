import {Device} from "../models";
import { ObservationsService } from "./observations-service";

export class DeviceObservationsService {
  public constructor(
    private readonly observationsService: ObservationsService,
  ) {}

  public async fetchAndInsertReading(): Promise<{ insertCount: number, reading: Device }> {
    const reading = await this.observationsService.readObservation();
    console.debug('readings: ', { ...reading, observations: reading.observations.length });
    console.debug('inserting readings: ', reading.observations.map((obs) => obs.dateTime.toString()));
    const readingInserts = reading.observations.map(obs => {
      console.log('obs: ', obs);
      const fileName = obs.dateTime.toString() + '.json';
      this.observationsService.insertReading(obs, fileName);
    });
    const insertResult = await Promise.allSettled(readingInserts);
    console.debug('inserted readings: ', insertResult.length);

    return {
      insertCount: insertResult.length,
      reading,
    }
  }
}
