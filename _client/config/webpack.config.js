// Modules
const entry = require('./modules/entry');
const getOutput = require('./modules/getOutput');
const getOptimization = require('./modules/getOptimization');
const rules = require('./modules/rules');
const resolve = require('./modules/resolve');
const getPlugins = require('./modules/getPlugins');

module.exports = (env, argv) => {
  const { mode } = argv;
  const productionMode = ('production' === mode);

  return {
    mode,

    entry,

    output: getOutput(productionMode),

    devtool: productionMode ? 'cheap-source-map' : 'cheap-module-eval-source-map',

    optimization: getOptimization(productionMode),

    module: {
      rules,
    },

    stats: {
      colors: true,
    },

    resolve,

    plugins: getPlugins(productionMode),
  };
};
