/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFiles: [
    "<rootDir>/test/setup-env-vars.js"
  ],
  // Silence logs
  silent: true,
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
};
