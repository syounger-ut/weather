import 'dotenv/config';
import { request } from './request';
import { routes } from './routes';

const observationsRoute = routes['/observations'];

const req = request(observationsRoute);
const handleResponse = (payload: JSON) => console.log(payload);
req(handleResponse);
