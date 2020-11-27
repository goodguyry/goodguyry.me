const fs = require('fs');
const path = require('path');
const paths = require('../_client/config/paths');

/**
 * Read CSS file and return a style tag for inline styles.
 *
 * @param  {string} file The Sass filepath.
 * @return {string}      A style tag with inline CSS.
 */
module.exports = function(file) {
  const filePath = path.join(paths.src, file);
  const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
  return `<style>${fileContents}</style>`;
}
