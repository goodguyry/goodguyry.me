// Helpers
const path = require('path');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  build: path.join(__dirname, '../../build'),
  projectRoot: path.join(__dirname, '../../'),
  components: path.join(__dirname, '../components'),
  styles: path.join(__dirname, '../src/scss'),
  scripts: path.join(__dirname, '../src/js'),
  config: __dirname,
}

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
        test: /\.js$/,
        exclude: /node_modules/,
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
            }
          }
        ],
      },
    ]
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
      chunkFilename: '[id].css'
    })
  ]
};
