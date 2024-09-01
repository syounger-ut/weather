import https from 'https';

type Route<T = object> = (params: T) => https.RequestOptions & { example: string };
export interface Routes extends Record<string, Route<any>> {
  '/observations': Route<{ timeStart: number, timeEnd: number }>;
}

export const routes: Routes = {
  '/observations': <T extends { timeStart: number, timeEnd: number }>({ timeStart, timeEnd }: T) => ({
    method: 'GET',
    host: `${process.env.TEMPEST_HOST}`,
    path: `/swd/rest/observations?token=${process.env.TEMPEST_TOKEN}&device_id=${process.env.TEMPEST_DEVICE_ID}&time_start=${timeStart}&time_end=${timeEnd}`,
    example: `/swd/rest/observations?token=mockTempestToken&device_id=mockTempestDeviceId&time_start=${timeStart}&time_end=${timeEnd}`,
  }),
};
