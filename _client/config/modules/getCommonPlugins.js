// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const CopyPlugin = require('copy-webpack-plugin');

// Helpers
const path = require('path');
const paths = require('../paths');
const yamlDictFromObject = require('../bin/yamlDictFromObject');

module.exports = (mode) => {
  const productionMode = ('production' === mode);

  return [
    new CopyPlugin({
      patterns: [
        { from: '_client/src/images', to: 'images' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: productionMode
        ? 'css/[name].[contenthash].min.css'
        : 'css/[name].css',
      chunkFilename: productionMode
        ? 'css/[name].[contenthash].chunk.min.css'
        : 'css/[name].chunk.css',
    }),
    new StylelintPlugin({
      configFile: path.join(paths.config, 'stylelint.config.js'),
    }),
    new StatsPlugin({
      transform(stats) {
        const entries = stats.assetsByChunkName;

        const assetMap = Object.keys(entries).reduce((acc, key) => {
          const assetList = [].concat(entries[key])
            .filter((asset) => '.map' !== path.parse(asset).ext)
            .reduce((lines, line) => {
              const { ext } = path.parse(line);
              return Object.assign({}, lines, { [ext.replace('.', '')]: line });
            }, {});

          return { ...acc, [key]: assetList };
        }, {});

        return JSON.stringify(yamlDictFromObject(assetMap));
      },
      fields: ['assetsByChunkName', 'hash'],
      filename: '../_data/assets.json',
    }),
  ];
};
