import https from 'https';

export type Route<T = object> = (params: T) => https.RequestOptions & { example: string };
export interface Routes {
  '/observations': Route<{ timeStart: number, timeEnd: number }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const routes: Routes = {
  '/observations': <T extends { timeStart: number, timeEnd: number }>({ timeStart, timeEnd }: T) => ({
    method: 'GET',
    host: `${process.env.TEMPEST_HOST}`,
    path: `/swd/rest/observations?token=${process.env.TEMPEST_TOKEN}&device_id=${process.env.TEMPEST_DEVICE_ID}&time_start=${timeStart}&time_end=${timeEnd}`,
    example: `/swd/rest/observations?token=mockTempestToken&device_id=mockTempestDeviceId&time_start=${timeStart}&time_end=${timeEnd}`,
  }),
  '/somethingElse': <T extends { foo: boolean }>({ foo }: T) => ({
    method: 'GET',
    host: `${process.env.TEMPEST_HOST}`,
    path: `/swd/rest/observations?token=${process.env.TEMPEST_TOKEN}&device_id=${process.env.TEMPEST_DEVICE_ID}&time_start=${foo}`,
    example: `/swd/rest/observations?token=mockTempestToken&device_id=mockTempestDeviceId&time_start=${foo}`,
  }),
} as const;
