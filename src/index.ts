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

const handler = async (event: any) => {
  const response = await fetchObservation();
  console.log('response: ', response);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

module.exports = { handler };
