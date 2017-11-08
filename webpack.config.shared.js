const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extensions = ['.js', '.json', '.jsx'];

const rules = [
  {
    test: /\.jsx?$/,
    include: path.resolve(__dirname, 'src/js'),
    use: [
      'babel-loader',
      'eslint-loader',
    ],
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
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'postcss-loader' },
      { loader: 'sass-loader' },
    ],
  },
];


const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/html/index.html',
    inject: true,
    favicon: 'src/img/favicon.ico',
  }),
];

module.exports = {
  extensions,
  rules,
  plugins,
};
