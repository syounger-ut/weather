import { DeviceObservationsService } from "./device-observations-service";
import { ObservationsService } from "./observations-service";
import { DeviceObservationFactory } from "../factories/device-observation-factory";
import { Storage } from "@weather/cloud-computing";
import { Device } from "../models";
import { PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { RESPONSE_DURATION } from "./__mocks__/observations-service";
jest.useFakeTimers();

jest.mock('./observations-service');
jest.mock('@weather/cloud-computing');

describe('DeviceObservationsService', () => {
  const observationsService = new ObservationsService(new Storage(), new DeviceObservationFactory());
  const service = new DeviceObservationsService(observationsService);

  describe('fetchAndInsertReading', () => {
    let subject:  { insertResult: PromiseSettledResult<PutObjectCommandOutput>[], reading: Device };

    beforeEach(async () => {
      const reading = service.fetchAndInsertReading();
      jest.advanceTimersByTime(RESPONSE_DURATION);
      subject = await reading;
    });

    it('should call ObservationsService#readObservation', () => {
      expect(observationsService.readObservation).toHaveBeenCalled();
    });

    it('should call ObservationsService#insertReading', () => {
      expect(observationsService.insertReading).toHaveBeenCalledWith(
        {
          dateTime: 1722896065,
          windLull: 0.68,
          windAvg: 1.18,
          windGust: 1.57,
          windDirection: 227,
          windSampleInterval: 3,
          pressure: 980.7,
          airTemperature: 17.5,
          relativeHumidity: 94,
          illuminance: 0,
          uv: 0,
          solarRadiation: 0,
          rainAccumulation: 0,
          precipitationType: 0,
          avgStrikeDistance: 0,
          strikeCount: 0,
          battery: 2.64,
          reportInterval: 1,
          localDayRainAccumulation: 5.012507,
          ncRainAccumulation: 0,
          localDayNCRainAccumulation: 6.205988,
          precipitationAnalysis: 0,
          deviceId: 123,
        },
        '1722896065.json',
      );
    });

    it('should resolve the insertReading', async () => {
      expect(subject.insertResult).toEqual([
        { status: 'fulfilled', value: { foo: 'bar' } },
        { status: 'fulfilled', value: { foo: 'bar' } },
      ]);
    });

    it.only('should return an object with insertCount and reading properties', () => {
      expect(subject).toHaveProperty('insertResult');
      expect(subject).toHaveProperty('reading');
    });
  });
});
