import { ObservationsService } from "./observations-service";
import { request } from "../utils/request";
import { Device, Observation } from "../models";
import { DeviceObservationFactory } from "../factories/device-observation-factory";
import { Storage } from '@weather/cloud-computing';
import { PutObjectCommandOutput } from "@aws-sdk/client-s3";

jest.mock('../utils/request');
jest.mock('@weather/cloud-computing');
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
    const mockObservation: Observation = {
      toJson: jest.fn().mockReturnValue(JSON.stringify({ foo: 'bar' })),
    } as unknown as Observation;
    const mockFileName = 'mock-file-name.json';

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should verify the directory exists', async () => {
      await service().insertReading(mockObservation, 'test-obj');
      expect(storageService.directoryExists).toHaveBeenCalledWith('weather-tempest-records');
    });

    describe('when the directory exists', () => {
      beforeEach(async () => {
        storageService.directoryExists = jest.fn().mockResolvedValue(true);
        await service().insertReading(mockObservation, mockFileName);
      });

      it('should create the object', () => {
        expect(storageService.createObject).toHaveBeenCalledWith('weather-tempest-records', `year=1066/month=01/day=02/hour=23/${mockFileName}`, "{\"foo\":\"bar\"}");
      });
    });

    describe('when the directory does not exist', () => {
      let subject: () => Promise<PutObjectCommandOutput>;

      beforeEach(async () => {
        storageService.directoryExists = jest.fn().mockResolvedValue(false);
        subject = async () => await service().insertReading(mockObservation, mockFileName);
      });

      it('should return false', async () => {
        await expect(subject()).rejects.toThrow(Error);
        await expect(subject()).rejects.toThrow('Directory does not exist. Create it first.');
      });
    });
  });
});
