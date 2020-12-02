const path = require('path');

const projectRoot = path.join(__dirname, '../../');

module.exports = {
  projectRoot,
  public: path.join(projectRoot, '_site'),
  src: path.join(projectRoot, '_client/src'),
  scss: path.join(projectRoot, '_client/src/scss'),
};
