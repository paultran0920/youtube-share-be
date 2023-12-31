import type { Config } from 'jest';

const config: Config = {
  displayName: 'Unit Testing',
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: '.spec.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
