// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
// Helpers
const path = require('path');
const yamlDictFromObject = require('../bin/yamlDictFromObject');

const paths = {
  build: path.join(__dirname, '../../build'),
  projectRoot: path.join(__dirname, '../../'),
  components: path.join(__dirname, '../components'),
  styles: path.join(__dirname, '../src/scss'),
  scripts: path.join(__dirname, '../src/js'),
  entries: path.join(__dirname, '../entries'),
  jekyllSass: path.join(__dirname, '../../_scss'),
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
    mode,

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

    devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',

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
                  paths.jekyllSass,
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
        filename: prod
          ? 'css/[name].[contenthash].min.css'
          : 'css/[name].css',
        chunkFilename: prod
          ? 'css/[name].[contenthash].chunk.min.css'
          : 'css/[name].chunk.css',
      }),
      new StylelintPlugin({
        configFile: path.join(paths.config, 'stylelint.config.js'),
      }),
      new StatsPlugin({
        transform(stats) {
          const entries = stats.assetsByChunkName;

          const assetMap = Object.keys(entries).reduce((acc, entry) => {
            const assetList = entries[entry]
              .filter((asset) => '.map' !== path.parse(asset).ext)
              .reduce((lines, line) => {
                const { ext } = path.parse(line);
                return Object.assign({}, lines, { [ext.replace('.', '')]: line });
              }, {});

            return { ...acc, [entry]: assetList };
          }, {});

          return yamlDictFromObject(assetMap);
        },
        fields: ['assetsByChunkName', 'hash'],
        filename: '../_data/assets.yaml',
      }),
    ],
  };
};
