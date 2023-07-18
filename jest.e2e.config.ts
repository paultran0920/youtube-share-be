import type { Config } from 'jest';

const config: Config = {
  displayName: 'E2E Testing',
  roots: ['<rootDir>/test-e2e/'],
  modulePaths: ['<rootDir>'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: '.e2e-spec.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
