import 'dotenv/config';
import { Storage } from "./adapters/storage";
import { ObservationsService } from "./services/observations-service";
import { DeviceObservationFactory } from "./factories/device-observation-factory";

const handler = async (event: any) => {
  const svs = new ObservationsService(new Storage(), new DeviceObservationFactory());
  const reading = await svs.readObservation();
  console.log('reading: ', reading);
  const readingInserts = reading.observations.map(obs => svs.insertReading(obs, obs.dateTime.toString()));
  await Promise.allSettled(readingInserts);

  return {
    statusCode: 200,
    body: JSON.stringify(reading),
  };
}

module.exports = { handler };
