import 'dotenv/config';
import { request } from './utils/request';
import { routes } from './utils/routes';
import { parsePayload } from './utils/observationDevice';

const observationsRoute = routes['/observations'];

const fetchObservation = async () => {
  const req = request(observationsRoute);
  const handleResponse = (payload: any): unknown => parsePayload(payload);
  return await req(handleResponse);
};

fetchObservation().then(r => console.log(r));
