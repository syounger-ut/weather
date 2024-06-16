import https from 'https';
import { ClientRequest, IncomingMessage } from "node:http";

const dispatch = (requestOptions: https.RequestOptions, callback: (payload: any) => any): ClientRequest => (
  https.request(requestOptions, (res: IncomingMessage) => {
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

      callback(payload);
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  })
);

type RequestCallback = (resolve: (payload: any) => unknown) => void;
export const request = (requestOptions: https.RequestOptions): RequestCallback => (
  (resolve: (payload: any) => unknown): void => {
    const req = dispatch(requestOptions, resolve);

    req.end();
  }
);

