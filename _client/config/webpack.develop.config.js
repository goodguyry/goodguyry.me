// Plugins.
const LiveReloadPlugin = require('webpack-livereload-plugin');

// Modules.
const entry = require('./modules/entry');
const output = require('./modules/output');
const rules = require('./modules/rules');
const resolve = require('./modules/resolve');
const getCommonPlugins = require('./modules/getCommonPlugins');

module.exports = () => ({
  mode: 'development',

  entry,

  output: Object.assign({}, output, {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  }),

  devtool: 'cheap-module-eval-source-map',

  optimization: {},

  module: {
    rules,
  },

  stats: {
    colors: true,
  },

  resolve,

  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true,
      delay: 1000,
    }),
  ].concat(getCommonPlugins('development')),
});
