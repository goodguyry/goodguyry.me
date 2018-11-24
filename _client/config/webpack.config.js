// Helpers
const path = require('path');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const paths = {
  build: path.join(__dirname, '../../build'),
  projectRoot: path.join(__dirname, '../../'),
  components: path.join(__dirname, '../components'),
  styles: path.join(__dirname, '../src/scss'),
  scripts: path.join(__dirname, '../src/js'),
  entries: path.join(__dirname, '../entries'),
  config: __dirname,
};

const include = [
  paths.components,
  paths.scripts,
  paths.entries,
];

const exclude = [
  /node_modules/,
  /\.min\.js$/,
];

module.exports = {
  entry: {
    base: '_client/entries/base',
    code: '_client/entries/code',
  },
  output: {
    path: paths.build,
    publicPath: paths.projectRoot,
  },
  module: {
    rules: [
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
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.join(__dirname, '../../_scss'),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      paths.projectRoot,
      'node_modules',
    ],
    extensions: ['.js', '.json', '.css'],
    alias: {
      components: paths.components,
      scss: paths.styles,
      js: paths.scripts,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new StylelintPlugin({
      configFile: path.join(paths.config, 'stylelint.config.js'),
    }),
  ],
};
