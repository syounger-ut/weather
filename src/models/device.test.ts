import { Device } from "./device";
import { Observation } from "./observation";
import { Status } from "./status";

import payload from '../factories/__mocks__/observations.json';

describe('Device', () => {
  let subject: Device;

  beforeEach(() => {
    subject = new Device(
      payload.device_id,
      payload.type,
      payload.source,
    );
  });

  it('should initialize with attributes', () => {
    expect(subject.deviceId).toEqual(payload.device_id);
    expect(subject.type).toEqual(payload.type);
    expect(subject.source).toEqual(payload.source);
  });

  describe('observations', () => {
    const observation = new Observation(
      payload.obs[0][0],
      payload.obs[0][1],
      payload.obs[0][2],
      payload.obs[0][3],
      payload.obs[0][4],
      payload.obs[0][5],
      payload.obs[0][6],
      payload.obs[0][7],
      payload.obs[0][8],
      payload.obs[0][9],
      payload.obs[0][10],
      payload.obs[0][11],
      payload.obs[0][12],
      payload.obs[0][13],
      payload.obs[0][14],
      payload.obs[0][15],
      payload.obs[0][16],
      payload.obs[0][17],
      payload.obs[0][18],
      payload.obs[0][19],
      payload.obs[0][20],
      payload.obs[0][21],
    );


    describe('#addObservation', () => {
      beforeEach(() => {
        subject.addObservation(observation);
      });

      it('should add the observation to the object', () => {
        expect(subject.observations).toEqual([observation]);
      });
    });
  });

  describe('status', () => {
    const status = new Status(123, 'Status_message');

    describe('#addStatus', () => {
      beforeEach(() => {
        subject.addStatus(status);
      });

      it('should add the observation to the object', () => {
        expect(subject.status).toEqual(status);
      });
    });
  });

  describe('#toJson', () => {
    it('should convert the device instance to a json object', () => {
      expect(subject.toJson()).toMatch(
        `{\
            \"deviceId\":123,\
            \"type\":\"obs_st\",\
            \"source\":\"cache\",\
            \"observations\":[]\
        }`.split(' ').join('')
      )
    });
  });
});
