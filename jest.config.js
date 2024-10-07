/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^routes/(.*)$': '<rootDir>/src/routes/$1',
    '^test-utils$': '<rootDir>/src/test-utils/test-utils.tsx',
  }
};