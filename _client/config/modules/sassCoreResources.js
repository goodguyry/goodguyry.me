const path = require('path');
const paths = require('../paths');

const sassCoreResources = [
  './_utilities.scss',
  './_layout.scss',
  './_typography.scss',
  './_theme.scss',
  './_block-styles.scss',
].map((file) => path.resolve(`${paths.scss}/core`, file));

module.exports = sassCoreResources;
