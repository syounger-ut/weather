import { TempestDeviceObservation } from '../types/device-observation';
import observations from './__mocks__/observations.json';
import { DeviceObservationFactory } from "./device-observation-factory";

const payload: TempestDeviceObservation = observations;

describe('DeviceObservationFactory', () => {
  const subject = new DeviceObservationFactory().build(payload);

  it('should contain device attributes', () => {
    expect(subject).toMatchObject({
      deviceId: 123,
      source: 'cache',
      type: 'obs_st',
    });
  });

  it('should include observations', () => {
    expect(subject.observations[0]).toMatchObject({
      deviceId: 123,
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
      precipitationAnalysis: 0
    });
  });

  it('should include status', () => {
    expect(subject.status).toMatchObject({
      statusCode: 0,
      statusMessage: 'SUCCESS',
    });
  });
});
