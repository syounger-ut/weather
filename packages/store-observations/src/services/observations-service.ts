import { Device, Observation } from '../models';
import { request } from '../utils/request';
import { TempestDeviceObservation } from '../types/device-observation';
import { routes } from '../utils/routes';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { DeviceObservationFactory } from "../factories/device-observation-factory";
import { dateStartEndSeconds, formatDateToString, unixToDateTime } from "../utils/time";
import { Storage } from '@weather/cloud-computing';

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

  public async insertReading(reading: Observation, fileName: string): Promise<PutObjectCommandOutput> {
    const bucketExists = await this.storage.directoryExists(BUCKET_NAME);

    if (!bucketExists) {
      throw new Error('Directory does not exist. Create it first.');
    }

    const objectKey = formatDateToString(unixToDateTime(reading.dateTime)) + fileName;

    return await this.storage.createObject(BUCKET_NAME, objectKey, reading.toJson());
  }

  private fetchObservation = async (): Promise<Device> => {
    const { start: timeStart, end: timeEnd } = dateStartEndSeconds(this.yesterdaysDate());

    const req = request(observationsRoute({ timeStart, timeEnd }));
    const handleResponse = (payload: TempestDeviceObservation): Device => this.deviceObservationFactory.build(payload);
    return await req(handleResponse);
  };

  private yesterdaysDate = (): Date => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // yesterday
    return date;
  };
}
