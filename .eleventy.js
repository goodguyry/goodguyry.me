const path = require('path');
const fs = require('fs');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const svgContents = require('eleventy-plugin-svg-contents');
const paths = require('./_client/config/paths');
const doStyles = require('./_client/config/doStyles');
const account = require('./_client/config/shortcode-account');
const inlineContents = require('./_client/config/filter-inlineContents');

module.exports = function(eleventyConfig) {
  // The Config object.
  const dir = {
    layouts: '_layouts',
    data: '_client/data',
  };

  // Watch files.
  eleventyConfig.addWatchTarget('./_client/src/scss/');

  // Process files before building.
  eleventyConfig.on('beforeBuild', () => {
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
        const processedCss = await doStyles(path.resolve(paths.projectRoot, entry));

        // Write the output to disk.
        fs.writeFileSync(
          cssPath,
          processedCss,
          (error) => console.error(`Error writing generated CSS: ${error}`)
        );

        console.log('Writing', outputFilname, 'from', file);
      });
  });

  // Add syntax highlighting.
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(svgContents);

  // Copy the directories.
  eleventyConfig.addPassthroughCopy({
    '_client/src/css': 'css',
    '_client/src/images/**/*.ico': '.',
    '_client/src/images': 'images',
    '_client/src/fonts': 'fonts',
  });

  // Don't use the gitignore file.
  eleventyConfig.setUseGitIgnore(false);

  // Shortcodes.
  eleventyConfig.addShortcode('account', account);

  // Filters.
  eleventyConfig.addFilter('inlineContents', inlineContents);
  eleventyConfig.addFilter('toUTCString', function(date) {
    return new Date(date).toUTCString();
  });

  // Override BrowserSync options.
  eleventyConfig.setBrowserSyncConfig({
    server: false,
    proxy: 'http://goodguyry.http',
  });

  // Simple posts collection in descending order.
  // Using Liquid's `reverse` filter had strange side-effects.
  eleventyConfig.addCollection('descendingPosts', (collectionApi) => {
    return collectionApi.getFilteredByTag('post').reverse();
  });

  return { dir };
};
