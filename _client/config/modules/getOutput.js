const paths = require('../paths');

module.exports = (productionMode) => {
  const common = {
    path: paths.build,
    publicPath: '/build/',
  };

  return productionMode
    ? Object.assign({}, common, {
      filename: 'js/[name].[contenthash].bundle.min.js',
      chunkFilename: 'js/[name].[contenthash].chunk.min.js',
    })
    : Object.assign({}, common, {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].chunk.js',
    });
};
