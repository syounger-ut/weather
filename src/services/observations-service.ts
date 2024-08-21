import { Device } from '../models';
import { request } from '../utils/request';
import { TempestDeviceObservation } from '../types/deviceObservation';
import { parsePayload } from '../utils/observationDevice';
import { routes } from '../utils/routes';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { Storage } from '../adapters/storage';

const observationsRoute = routes['/observations'];
const BUCKET_NAME = 'weather-tempest-records';

export class ObservationsService {
  public constructor(
    private readonly storage: Storage,
  ) {}

  public async readObservation(): Promise<Device> {
    return await this.fetchObservation();
  }

  public async insertReading<T>(reading: T): Promise<PutObjectCommandOutput | boolean> {
    const bucketExists = await this.storage.directoryExists(BUCKET_NAME);

    if (!bucketExists) {
      console.error('Directory does not exist. Create it first.');
      return false;
    }

    console.log(`Inserting reading: ${JSON.stringify(reading)}`);

    return await this.storage.createObject(BUCKET_NAME, 'test-reading', reading);
  }

  private fetchObservation = async () => {
    const req = request(observationsRoute);
    const handleResponse = (payload: TempestDeviceObservation): Device => parsePayload(payload);
    return await req(handleResponse);
  };
}
