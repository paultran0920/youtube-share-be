import type { Config } from 'jest';

const config: Config = {
  displayName: 'unit',
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
