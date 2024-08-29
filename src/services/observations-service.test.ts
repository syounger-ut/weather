import { ObservationsService } from "./observations-service";
import { request } from "../utils/request";
import { Device } from "../models";
import { DeviceObservationFactory } from "../factories/device-observation-factory";
import { Storage } from "../adapters/storage";
import { PutObjectCommandOutput } from "@aws-sdk/client-s3";

jest.mock('../utils/request');
jest.mock('../adapters/storage');
jest.mock('../utils/time');

const storageService = new Storage();
const deviceObservationFactory = new DeviceObservationFactory();

const service = () => (
  new ObservationsService(storageService, deviceObservationFactory)
);

describe('ObservationsService', () => {
  describe('#readObservation', () => {
    let response: Device;

    beforeEach(async () => {
      response = await service().readObservation();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should request with the observations route', async () => {
      const path = '/swd/rest/observations?token=mockTempestToken&device_id=mockTempestDeviceId&time_start=123&time_end=321';
      expect(request).toHaveBeenCalledWith(expect.objectContaining({ path }));
    });

    it('should return a device object', () => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });

  describe('#insertReading', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should verify the directory exists', async () => {
      await service().insertReading({});
      expect(storageService.directoryExists).toHaveBeenCalledWith('weather-tempest-records');
    });

    describe('when the directory exists', () => {
      beforeEach(async () => {
        storageService.directoryExists = jest.fn().mockResolvedValue(true);
        await service().insertReading({});
      });

      it('should create the object', () => {
        expect(storageService.createObject).toHaveBeenCalledWith('weather-tempest-records', '1066-01-02.json', {});
      });
    });

    describe('when the directory does not exist', () => {
      let subject: PutObjectCommandOutput | boolean;

      beforeEach(async () => {
        storageService.directoryExists = jest.fn().mockResolvedValue(false);
        subject = await service().insertReading({});
      });

      it('should return false', () => {
        expect(subject).toBe(false);
      });
    });
  });
});
