const path = require('path');
const webpack = require('webpack');
const sharedConfig = require('./webpack.config.shared');

// Make node env available for babel loader and other loaders
// https://github.com/webpack/webpack/issues/2121#issuecomment-209630944
process.env.NODE_ENV = 'development';

module.exports = {
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3001/',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    ...sharedConfig.plugins,
  ],
};
