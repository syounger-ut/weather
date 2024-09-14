import dotEnv from 'dotenv';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Storage } from '@weather/cloud-computing';
import { ObservationsService } from './services/observations-service';
import { DeviceObservationFactory } from './factories/device-observation-factory';
import { DeviceObservationsService } from './services/device-observations-service';

dotEnv.config({ path:'../../.env' });

const initializeServices = () => {
  const storage = new Storage();
  const deviceObservationFactory = new DeviceObservationFactory();
  const observationsService = new ObservationsService(storage, deviceObservationFactory);
  const deviceObservationsService = new DeviceObservationsService(observationsService);

  return { deviceObservationsService };
};

const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { deviceObservationsService } = initializeServices();
  const { reading, insertResult } = await deviceObservationsService.fetchAndInsertReading();

  return {
    statusCode: 200,
    body: JSON.stringify({
      readings: reading.observations.length,
      insertCount: insertResult.length,
    }),
  };
};

module.exports = { handler };
