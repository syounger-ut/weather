import { DeviceObservationsService } from "./device-observations-service";
import { ObservationsService } from "./observations-service";
import { DeviceObservationFactory } from "../factories/device-observation-factory";
import { Storage } from "@weather/cloud-computing";
import { Device } from "../models";

jest.mock('./observations-service');
jest.mock('@weather/cloud-computing');

describe('DeviceObservationsService', () => {
  const observationsService = new ObservationsService(new Storage(), new DeviceObservationFactory());
  const service = new DeviceObservationsService(observationsService);

  describe('fetchAndInsertReading', () => {
    let subject:  { insertCount: number, reading: Device };

    beforeEach(async () => {
      subject = await service.fetchAndInsertReading();
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

    it('should return an object with insertCount and reading properties', () => {
      expect(subject).toHaveProperty('insertCount');
      expect(subject).toHaveProperty('reading');
    });
  });
});
