import https from 'https';
import { request } from './request';

const options: https.RequestOptions = {
  method: 'GET',
  host: `${process.env.TEMPEST_HOST}`,
  path: `/swd/rest/observations?token=${process.env.TEMPEST_TOKEN}&device_id=${process.env.TEMPEST_DEVICE_ID}`,
};

const req = request(options);
req((payload: JSON) => console.log(payload));
