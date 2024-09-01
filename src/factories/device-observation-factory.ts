import { TempestDeviceObservation } from "../types/device-observation";
import { Device, Observation, Status } from "../models";

export class DeviceObservationFactory {
  public build(payload: TempestDeviceObservation): Device {
    const device = this.buildDevice(payload);
    const status = this.buildStatus(payload);
    device.addStatus(status);

    payload.obs.forEach((obs) => {
      const observation = this.buildObservation(obs);
      observation.addDevice(device);
      device.addObservation(observation);
    });

    return device;
  }

  private buildDevice = (payload: TempestDeviceObservation): Device => (
    new Device(
      payload.device_id,
      payload.type,
      payload.source,
    )
  );

  private buildStatus = (payload: TempestDeviceObservation): Status => (
    new Status(
      payload.status.status_code,
      payload.status.status_message,
    )
  );

  private buildObservation = (payloadObs: TempestDeviceObservation['obs'][number]): Observation => (
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
}
