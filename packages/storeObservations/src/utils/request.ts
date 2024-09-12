import https from 'https';
import { IncomingMessage } from "node:http";

const dispatch = <T>(requestOptions: https.RequestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res: IncomingMessage) => {
      let data: string = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('error', chunk => {
        data += chunk;
      })

      res.on('end', () => {
        const payload = !data ? undefined : JSON.parse(data);
        resolve(payload);
      });
    }).on('error', err => {
      reject(err);
    })

    return req.end()
  });
};

export type RequestCallback = <T, F>(handleResponse: (payload: T) => F) => Promise<F>;
export const request = (requestOptions: https.RequestOptions): RequestCallback => (
  <T, F>(handleResponse: (payload: T) => F) => dispatch<T>(requestOptions)
    .then(handleResponse)
);
