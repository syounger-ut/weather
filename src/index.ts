import 'dotenv/config';
import https from 'https';
import { ClientRequest, IncomingMessage } from "node:http";

const options: https.RequestOptions = {
  method: 'GET',
  host: `${process.env.TEMPEST_HOST}`,
  path: `/swd/rest/observations?token=${process.env.TEMPEST_TOKEN}&device_id=${process.env.TEMPEST_DEVICE_ID}`,
};

const req: ClientRequest = https.request(options, (res: IncomingMessage) => {
  let data: any[] = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const payload = JSON.parse(Buffer.concat(data).toString());
    console.log('payload: ', payload);
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});

req.end();
