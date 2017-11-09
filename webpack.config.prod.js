const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    rules: [
      {
        test: /\.(css|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      ...sharedConfig.rules,
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('style.css'),
    ...sharedConfig.plugins,
  ],
  devtool: 'cheap-module-source-map',
};
