const path = require('path');

const projectRoot = path.join(__dirname, '../../');

module.exports = {
  projectRoot,
  public: path.join(projectRoot, '_site'),
  scss: path.join(projectRoot, '_client/src/scss'),
};
