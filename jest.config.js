module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.ts'],
  reporters: ['default'],
  roots: ['<rootDir>'], // Specifies where your typescript files are located.
  transform: { '^.+\\.tsx?$': 'ts-jest' } // The transform config just tells jest to use ts-jest for ts / tsx files.
};
