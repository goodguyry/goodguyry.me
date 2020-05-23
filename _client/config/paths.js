const path = require('path');

module.exports = {
  build: path.join(__dirname, '../../build'),
  projectRoot: path.join(__dirname, '../../'),
  site: path.join(__dirname, '../../_site'),
  components: path.join(__dirname, '../components'),
  scss: path.join(__dirname, '../src/scss'),
  js: path.join(__dirname, '../src/js'),
  fonts: path.join(__dirname, '../src/fonts'),
  entries: path.join(__dirname, '../entries'),
  siteData: path.join(__dirname, '../../_data'),
  config: __dirname,
};
