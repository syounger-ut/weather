import 'dotenv/config';
import { request } from './utils/request';
import { routes } from './utils/routes';
import { parsePayload } from './utils/observationDevice';

const observationsRoute = routes['/observations'];

const req = request(observationsRoute);
const handleResponse = (payload: any) => {
  const resp = parsePayload(payload);
  console.log(resp);
};
req(handleResponse);
