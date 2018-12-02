const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (productionMode) => {
  if (productionMode) {
    return {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
      ],
    };
  }

  return {};
};
