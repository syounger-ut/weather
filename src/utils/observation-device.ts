import { Device, Status, Observation } from '../models';
import { TempestDeviceObservation } from "../types/device-observation";

const buildDevice = (payload: TempestDeviceObservation): Device => (
  new Device(
    payload.device_id,
    payload.type,
    payload.source,
  )
);

const buildStatus = (payload: TempestDeviceObservation): Status => (
  new Status(
    payload.status.status_code,
    payload.status.status_message,
  )
);

const buildObservation = (payloadObs: TempestDeviceObservation['obs'][number]): Observation => (
  new Observation(
    payloadObs[0],
    payloadObs[1],
    payloadObs[2],
    payloadObs[3],
    payloadObs[4],
    payloadObs[5],
    payloadObs[6],
    payloadObs[7],
    payloadObs[8],
    payloadObs[9],
    payloadObs[10],
    payloadObs[11],
    payloadObs[12],
    payloadObs[13],
    payloadObs[14],
    payloadObs[15],
    payloadObs[16],
    payloadObs[17],
    payloadObs[18],
    payloadObs[19],
    payloadObs[20],
    payloadObs[21],
  )
);

export const parsePayload = (payload: TempestDeviceObservation) =>{
  const device = buildDevice(payload);
  const status = buildStatus(payload);
  device.addStatus(status);

  payload.obs.forEach((obs) => {
    const observation = buildObservation(obs);
    device.addObservation(observation);
  });

  return device;
};
