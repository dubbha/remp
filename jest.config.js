module.exports = {
  modulePaths: ['src'],
  roots: ['test'],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    }
  }
};
