const path = require('path');

const projectRoot = path.join(__dirname, '../../');

module.exports = {
  projectRoot,
  site: path.join(projectRoot, '_site'),
  public: path.join(projectRoot, '_site'),
  components: path.join(projectRoot, '_client/components'),
  scss: path.join(projectRoot, '_client/src/scss'),
  js: path.join(projectRoot, '_client/src/js'),
  fonts: path.join(projectRoot, '_client/src/fonts'),
  entries: path.join(projectRoot, '_client/entries'),
  siteData: path.join(projectRoot, '_data'),
  config: __dirname,
};
