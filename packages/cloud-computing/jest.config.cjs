// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const sharedConfig = require('../../jest.config.cjs');

// eslint-disable-next-line no-undef
module.exports = {
  ...sharedConfig,
  rootDir: './',
  collectCoverageFrom: [
    '<rootDir>/packages/cloud-computing/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/cloud-computing/src/**/*.d.ts',
  ],
};
