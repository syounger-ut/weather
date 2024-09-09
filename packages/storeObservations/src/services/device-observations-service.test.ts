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
      expect(observationsService.insertReading).toHaveBeenCalled();
    });

    it('should return an object with insertCount and reading properties', () => {
      expect(subject).toHaveProperty('insertCount');
      expect(subject).toHaveProperty('reading');
    });
  });
});
