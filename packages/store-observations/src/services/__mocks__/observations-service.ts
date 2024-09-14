import observations from '../../factories/__mocks__/observations.json';
import { DeviceObservationFactory } from "../../factories/device-observation-factory";

export const RESPONSE_DURATION = 1000;

export const ObservationsService = jest.fn().mockImplementation(() => ({
  readObservation: jest.fn().mockResolvedValue(new DeviceObservationFactory().build(observations)),
  insertReading: jest.fn().mockReturnValue(new Promise((resolve) => {
    setTimeout(() => {
      resolve({ foo: 'bar' });
    }, RESPONSE_DURATION);
  })),
}));
