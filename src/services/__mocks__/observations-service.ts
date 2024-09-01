import observations from '../../factories/__mocks__/observations.json';
import {DeviceObservationFactory} from "../../factories/device-observation-factory";

export const ObservationsService = jest.fn().mockImplementation(() => ({
  readObservation: jest.fn().mockResolvedValue(new DeviceObservationFactory().build(observations)),
  insertReading: jest.fn().mockResolvedValue({}),
}));
