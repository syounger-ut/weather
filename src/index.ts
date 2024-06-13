import 'dotenv/config';
import { request } from './utils/request';
import { routes } from './utils/routes';

const observationsRoute = routes['/observations'];

const req = request(observationsRoute);
const handleResponse = (payload: JSON) => console.log(payload);
req(handleResponse);
