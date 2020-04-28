module.exports = {
  transformIgnorePatterns: [
    '.\node_modules\\@types\\jquery',
    '.\node_modules\\jquery',
  ],
  setupFiles: ['./jest-setup.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
};
