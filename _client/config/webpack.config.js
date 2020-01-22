// Plugins.
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

// Modules.
const entry = require('./modules/entry');
const output = require('./modules/output');
const rules = require('./modules/rules');
const resolve = require('./modules/resolve');
const getCommonPlugins = require('./modules/getCommonPlugins');
const paths = require('./paths');

module.exports = () => ({
  mode: 'production',

  entry,

  output: Object.assign({}, output, {
    filename: 'js/[name].[contenthash].bundle.min.js',
    chunkFilename: 'js/[name].[contenthash].chunk.min.js',
  }),

  devtool: 'cheap-source-map',

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  module: {
    rules,
  },

  stats: {
    colors: true,
  },

  resolve,

  plugins: [
    new CleanWebpackPlugin(
      [`${paths.build}/*`],
      { root: paths.projectRoot }
    ),
    new MinifyPlugin({}, {}),
  ].concat(getCommonPlugins('production')),
});
