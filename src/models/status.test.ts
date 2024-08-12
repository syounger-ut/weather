import { Status } from "./status";
import { Device } from "./device";

import payload from '../utils/__mocks__/observations.json';

describe('Status', () => {
  let subject: Status;

  beforeEach(() => {
    subject = new Status(
      payload.status.status_code,
      payload.status.status_message,
    );
  });

  it('should initialize with attributes', () => {
    expect(subject.statusCode).toEqual(payload.status.status_code);
    expect(subject.statusMessage).toEqual(payload.status.status_message);
  });

  describe('observations', () => {
    const device: Device = new Device(
      payload.device_id,
      payload.type,
      payload.source,
    );


    describe('#addObservation', () => {
      beforeEach(() => {
        subject.addDevice(device);
      });

      it('should add the observation to the object', () => {
        expect(subject.device).toEqual(device);
      });
    });
  });

  describe('#toJson', () => {
    it('should convert the device instance to a json object', () => {
      expect(subject.toJson()).toMatch(
        `{\
          \"statusCode\":0,\
          \"statusMessage\":\"SUCCESS\"\
        }`.split(' ').join('')
      )
    });
  });
});