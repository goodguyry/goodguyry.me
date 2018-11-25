const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../paths');

const include = [
  paths.components,
  paths.scripts,
  paths.entries,
];

const exclude = [
  /node_modules/,
  /\.min\.js$/,
];

module.exports = [
  {
    enforce: 'pre',
    test: /\.js$/,
    exclude,
    include,
    use: 'eslint-loader',
  },
  {
    test: /\.js$/,
    exclude,
    include,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.s?css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          minimize: {
            autoprefixer: false,
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.join(paths.config, 'postcss.config.js'),
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
            paths.jekyllSass,
          ],
        },
      },
    ],
  },
];
