import https from 'https';
import { ClientRequest, IncomingMessage } from "node:http";

const dispatch = (requestOptions: https.RequestOptions): Promise<ClientRequest> => {
  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res: IncomingMessage) => {
      let data: string = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const payload = JSON.parse(data);
        resolve(payload);
      });
    }).on('error', err => {
      reject(err);
    })

    return req.end()
  });
};

type RequestCallback = (handleResponse: (payload: ClientRequest) => unknown) => Promise<unknown>;
export const request = (requestOptions: https.RequestOptions): RequestCallback => (
  (handleResponse: (payload: ClientRequest) => unknown) => dispatch(requestOptions)
    .then(handleResponse)
);

