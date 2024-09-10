const sharedConfig = require('../../jest.config.cjs');

module.exports = {
  ...sharedConfig,
  rootDir: './',
  collectCoverageFrom: [
    '<rootDir>/packages/storeObservations/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/storeObservations/src/**/*.d.ts',
  ],
};
