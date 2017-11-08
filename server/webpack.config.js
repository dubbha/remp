const path = require('path');
const webpack = require('webpack');

// Make node env available for babel loader and other loaders
// https://github.com/webpack/webpack/issues/2121#issuecomment-209630944
process.env.NODE_ENV = 'production';

module.exports = {
  target: 'node',
  entry: {
    index: path.resolve(__dirname, 'src'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../src/js'),
        ],
        use: ['babel-loader'],
      },
      {
        test: /\.(ttf|eot|woff|svg|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            query: { name: '[name].[ext]' },
          },
        ],
      },
      {
        test: /\.(css|sass)$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
