module.exports = {
  modulePaths: ['src/js'],
  roots: ['test'],
  moduleFileExtensions: ['js', 'jsx'],
  collectCoverageFrom: ['src/js/**/*.{js,jsx}'],
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/enzyme.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
