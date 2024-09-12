/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{
      tsconfig: './tsconfig.test.json',
    }],
  },
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
  modulePathIgnorePatterns: [
    "<rootDir>/function/",
    "<rootDir>/coverage/"
  ],
  moduleNameMapper: {
    '@weather/(.*)': '<rootDir>/../../node_modules/@weather/$1/function'
  }
};
