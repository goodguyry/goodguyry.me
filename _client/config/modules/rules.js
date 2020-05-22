const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../paths');
const sassCoreResources = require('./sassCoreResources');

const include = [
  paths.components,
  paths.js,
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
    test: [
      /\.png$/,
      /\.jpg$/,
      /\.svg$/,
      /\.woff2?$/,
      /\.ttf$/,
    ],
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[ext]',
      },
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
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: sassCoreResources,
        },
      },
    ],
  },
];
