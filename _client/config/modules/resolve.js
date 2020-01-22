const paths = require('../paths');

const {
  entries,
  components,
  scss,
  js,
  fonts,
} = paths;

module.exports = {
  modules: [
    paths.projectRoot,
    'node_modules',
  ],
  extensions: ['.js', '.json', '.scss'],
  alias: {
    entries,
    components,
    scss,
    js,
    fonts,
  },
};
