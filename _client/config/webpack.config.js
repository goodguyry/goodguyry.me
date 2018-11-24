// Helpers
const path = require('path');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

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

module.exports = (env, argv) => {
  const { mode } = argv;
  const prod = 'production' === mode;

  return {
    entry: {
      base: '_client/entries/base',
      code: '_client/entries/code',
    },
    output: {
      path: paths.build,
      publicPath: paths.projectRoot,
      filename: prod
        ? 'js/[name].[contenthash].bundle.min.js'
        : 'js/[name].bundle.js',
      chunkFilename: prod
        ? 'js/[name].[contenthash].chunk.min.js'
        : 'js/[name].chunk.js',
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
        filename: 'css/[name].[contenthash].min.css',
        chunkFilename: 'css/[name].[contenthash].chunk.min.css',
      }),
      new StylelintPlugin({
        configFile: path.join(paths.config, 'stylelint.config.js'),
      }),
      new StatsPlugin({
        transform(stats) {
          const entries = stats.assetsByChunkName;

          const assetMap = Object.keys(entries).reduce((acc, entry) => {
            const assetList = Array.from(entries[entry])
              .filter((asset) => '.map' !== path.parse(asset).ext);

            return Object.assign({}, acc, { [entry]: assetList });
          }, {});

          return JSON.stringify(assetMap);
        },
        fields: ['assetsByChunkName', 'hash'],
        filename: 'assetMap.json',
      }),
    ],
  };
};
