import dotEnv from 'dotenv';

dotEnv.config({ path:'../../.env' });

export * from './adapters/database';
export * from './adapters/storage';
