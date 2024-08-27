import { Device } from '../models';
import { request } from '../utils/request';
import { TempestDeviceObservation } from '../types/device-observation';
import { routes } from '../utils/routes';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { Storage } from '../adapters/storage';
import { DeviceObservationFactory } from "../factories/device-observation-factory";
import {getTodaysDate} from "../utils/time";

const observationsRoute = routes['/observations'];
const BUCKET_NAME = 'weather-tempest-records';

export class ObservationsService {
  public constructor(
    private readonly storage: Storage,
    private readonly deviceObservationFactory: DeviceObservationFactory,
  ) {}

  public async readObservation(): Promise<Device> {
    return await this.fetchObservation();
  }

  public async insertReading<T>(reading: T): Promise<PutObjectCommandOutput | boolean> {
    const bucketExists = await this.storage.directoryExists(BUCKET_NAME);

    if (!bucketExists) {
      console.debug('Directory does not exist. Create it first.');
      return false;
    }

    const objectKey = getTodaysDate();
    console.log(`Inserting reading to "${objectKey}": ${JSON.stringify(reading)}`);

    return await this.storage.createObject(BUCKET_NAME, objectKey, reading);
  }

  private fetchObservation = async () => {
    const req = request(observationsRoute);
    const handleResponse = (payload: TempestDeviceObservation): Device => this.deviceObservationFactory.build(payload);
    return await req(handleResponse);
  };
}
