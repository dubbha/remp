const path = require('path');
const webpack = require('webpack');
const sharedConfig = require('./webpack.config.shared');

module.exports = {
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3001/',
      './src/js/index.js',
    ]
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
  ]
};
