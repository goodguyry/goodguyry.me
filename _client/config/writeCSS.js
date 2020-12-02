const path = require('path');
const fs = require('fs');
const paths = require('./paths');
const getProcessedCSS = require('./getProcessedCSS');

/**
 * Write processed CSS to disk.
 */
module.exports = () => {
  fs.readdirSync(paths.scss)
    // Filter out directories.
    .filter((file) => {
      return fs.statSync(path.resolve(paths.scss, file)).isFile();
    })
    .forEach( async (file) => {
      const entry = path.resolve(paths.scss, file);
      const basename = path.basename(entry, '.scss');
      const outputFilname = `css/${basename}.css`;
      const cssPath = path.resolve(paths.src, outputFilname);

      // Create css path if it doesn't exist.
      if (! fs.existsSync(path.dirname(cssPath))) {
        try {
          fs.mkdirSync(path.dirname(cssPath), { recursive: true });
        } catch (error) {
          console.error(`Error making directory for CSS output: ${error}`);
        }
      }

      // Get the processed CSS. This works without resolving the path, but we'll do it anyway.
      const processedCss = await getProcessedCSS(path.resolve(paths.projectRoot, entry));

      // Write the output to disk.
      fs.writeFileSync(
        cssPath,
        processedCss,
        (error) => console.error(`Error writing generated CSS: ${error}`)
      );

      console.log('Writing', outputFilname, 'from', file);
    });
};
