import dotEnv from 'dotenv';

dotEnv.config({ path:'../../.env' });

export { Database } from './adapters/database';
export { Storage } from './adapters/storage';
