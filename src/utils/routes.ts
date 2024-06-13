import https from 'https';

export const routes: Record<string, https.RequestOptions> = {
  '/observations': {
    method: 'GET',
    host: `${process.env.TEMPEST_HOST}`,
    path: `/swd/rest/observations?token=${process.env.TEMPEST_TOKEN}&device_id=${process.env.TEMPEST_DEVICE_ID}`,
  },
};
