const path = require('path');
const webpack = require('webpack');
const sharedConfig = require('../webpack.config.shared');

// Make node env available for babel loader and other loaders
// https://github.com/webpack/webpack/issues/2121#issuecomment-209630944
process.env.NODE_ENV = 'production';

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './server/src/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: sharedConfig.extensions,
  },
  module: {
    rules: sharedConfig.rules.concat([
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: ['babel-loader'],
      },
    ]),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
