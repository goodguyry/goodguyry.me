const paths = require('../paths');

module.exports = {
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
};
