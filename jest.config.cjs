/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": ["ts-jest",{
      tsconfig: './tsconfig.test.json',
    }],
  },
  rootDir: './',
  setupFiles: [
    "../../test/setup-env-vars.js"
  ],
  // Silence logs
  silent: false,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/function/",
    "<rootDir>/coverage/"
  ],
  moduleNameMapper: {
    '@weather/(.*)': '<rootDir>/../../node_modules/@weather/$1/function'
  }
};
