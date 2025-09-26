module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@shared-kernel$': '<rootDir>/libs/shared-kernel/src',
    '^@shared-kernel/(.*)$': '<rootDir>/libs/shared-kernel/src/$1',
    '^@shared-auth/(.*)$': '<rootDir>/libs/shared-auth/src/$1',
    '^@shared-db$': '<rootDir>/libs/shared-db/src',
    '^@shared-db/(.*)$': '<rootDir>/libs/shared-db/src/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['dist'],
};
