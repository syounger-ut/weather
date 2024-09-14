import { Observation } from "./observation";
import { Device } from "./device";

import payload from '../factories/__mocks__/observations.json';

describe('Observation', () => {
  let subject: Observation;

  beforeEach(() => {
    subject = new Observation(
      1722896065,
      0.68,
      1.18,
      1.57,
      227,
      3,
      980.7,
      17.5,
      94,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2.64,
      1,
      5.012507,
      0,
      6.205988,
      0
    );
  });

  it('should initialize with attributes', () => {
    expect(subject.dateTime).toEqual(payload.obs[0][0]);
    expect(subject.windLull).toEqual(payload.obs[0][1]);
    expect(subject.windAvg).toEqual(payload.obs[0][2]);
    expect(subject.windGust).toEqual(payload.obs[0][3]);
    expect(subject.windDirection).toEqual(payload.obs[0][4]);
    expect(subject.windSampleInterval).toEqual(payload.obs[0][5]);
    expect(subject.pressure).toEqual(payload.obs[0][6]);
    expect(subject.airTemperature).toEqual(payload.obs[0][7]);
    expect(subject.relativeHumidity).toEqual(payload.obs[0][8]);
    expect(subject.illuminance).toEqual(payload.obs[0][9]);
    expect(subject.uv).toEqual(payload.obs[0][10]);
    expect(subject.solarRadiation).toEqual(payload.obs[0][11]);
    expect(subject.rainAccumulation).toEqual(payload.obs[0][12]);
    expect(subject.precipitationType).toEqual(payload.obs[0][13]);
    expect(subject.avgStrikeDistance).toEqual(payload.obs[0][14]);
    expect(subject.strikeCount).toEqual(payload.obs[0][15]);
    expect(subject.battery).toEqual(payload.obs[0][16]);
    expect(subject.reportInterval).toEqual(payload.obs[0][17]);
    expect(subject.localDayRainAccumulation).toEqual(payload.obs[0][18]);
    expect(subject.ncRainAccumulation).toEqual(payload.obs[0][19]);
    expect(subject.localDayNCRainAccumulation).toEqual(payload.obs[0][20]);
    expect(subject.precipitationAnalysis).toEqual(payload.obs[0][21]);
  });

  describe('device', () => {
    const device: Device = new Device(
      payload.device_id,
      payload.type,
      payload.source,
    );

    describe('#addDevice', () => {
      beforeEach(() => {
        subject.addDevice(device);
      });

      it('should add the device to the object', () => {
        expect(subject.deviceId).toEqual(device.deviceId);
      });
    });
  });

  describe('#toJson', () => {
    const device: Device = new Device(
      payload.device_id,
      payload.type,
      payload.source,
    );

    beforeEach(() => {
      subject.addDevice(device);
    });

    it('should convert the device instance to a json object', () => {
      expect(subject.toJson()).toMatch(
        `{\
          "deviceId":123,\
          "dateTime":1722896065,\
          "windLull":0.68,\
          "windAvg":1.18,\
          "windGust":1.57,\
          "windDirection":227,\
          "windSampleInterval":3,\
          "pressure":980.7,\
          "airTemperature":17.5,\
          "relativeHumidity":94,\
          "illuminance":0,\
          "uv":0,\
          "solarRadiation":0,\
          "rainAccumulation":0,\
          "precipitationType":0,\
          "avgStrikeDistance":0,\
          "strikeCount":0,\
          "battery":2.64,\
          "reportInterval":1,\
          "localDayRainAccumulation":5.012507,\
          "ncRainAccumulation":0,\
          "localDayNCRainAccumulation":6.205988,\
          "precipitationAnalysis":0\
        }`.split(' ').join('')
      );
    });
  });
});
