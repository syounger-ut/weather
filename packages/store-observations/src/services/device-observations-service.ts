import { PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { Device } from "../models";
import { ObservationsService } from "./observations-service";

export class DeviceObservationsService {
  public constructor(
    private readonly observationsService: ObservationsService,
  ) {}

  public async fetchAndInsertReading(): Promise<{ insertResult: PromiseSettledResult<PutObjectCommandOutput>[], reading: Device }> {
    const reading = await this.observationsService.readObservation();
    console.debug('readings: ', { ...reading, observations: reading.observations.length });
    console.debug('inserting readings: ', reading.observations.map((obs) => obs.dateTime.toString()));
    const readingInserts = reading.observations.map((obs): Promise<PutObjectCommandOutput> => {
      const fileName = obs.dateTime.toString() + '.json';
      return this.observationsService.insertReading(obs, fileName);
    });
    const insertResult = await Promise.allSettled(readingInserts);
    console.debug('inserted readings: ', insertResult.length);

    return {
      insertResult,
      reading,
    }
  }
}
