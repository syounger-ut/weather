import 'dotenv/config';
import { Storage } from './adapters/storage';
import { ObservationsService } from './services/observations-service';
import { DeviceObservationFactory } from './factories/device-observation-factory';
import { DeviceObservationsService } from './services/device-observations-service';

const initializeServices = () => {
  const storage = new Storage();
  const deviceObservationFactory = new DeviceObservationFactory();
  const observationsService = new ObservationsService(storage, deviceObservationFactory);
  const deviceObservationsService = new DeviceObservationsService(observationsService);

  return { deviceObservationsService };
}

const handler = async (event: any) => {
  const { deviceObservationsService } = initializeServices();
  const { reading, insertCount } = await deviceObservationsService.fetchAndInsertReading();

  return {
    statusCode: 200,
    body: {
      readings: reading.observations.length,
      insertCount,
    },
  };
}

module.exports = { handler };
