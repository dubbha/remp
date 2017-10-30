const path = require('path');
const webpack = require('webpack');
const sharedConfig = require('./webpack.config.shared');

// Make node env available for babel loader and other loaders
// https://github.com/webpack/webpack/issues/2121#issuecomment-209630944
process.env.NODE_ENV = 'production';

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './src/js/index.js',
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
    rules: sharedConfig.rules,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      minChunks: 2,
    }),
    ...sharedConfig.plugins,
  ],
  devtool: 'cheap-module-source-map',
};
