const path = require('path');
const paths = require('../paths');

const sassCoreResources = [
  './utilities.scss',
  './layout.scss',
  './typography.scss',
  './colors.scss',
].map((file) => path.resolve(`${paths.scss}/core`, file));

module.exports = sassCoreResources;
