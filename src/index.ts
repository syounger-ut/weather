import 'dotenv/config';
import {Storage} from "./adapters/storage";
import {ObservationsService} from "./services/observations-service";

const handler = async (event: any) => {
  const svs = new ObservationsService(new Storage());
  const reading = await svs.readObservation();
  console.log('reading: ', reading);
  await svs.insertReading(reading);

  return {
    statusCode: 200,
    body: JSON.stringify(reading),
  };
}

module.exports = { handler };
