const path = require('path');
const fs = require('fs');
const paths = require('./_client/config/paths');
const doStyles = require('./_client/config/doStyles');

// Plugins.
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginInjector = require('@infinity-interactive/eleventy-plugin-injector');
const svgContents = require('eleventy-plugin-svg-contents');

// Shortcodes.
const figure = require('./.eleventy/shortcode-figure');
const account = require('./.eleventy/shortcode-account');

module.exports = function(eleventyConfig) {
  // The Config object.
  const dir = {
    layouts: '_layouts',
  };

  // Watch files.
  eleventyConfig.addWatchTarget('./_client/src/scss/');

  eleventyConfig.addPlugin(
    pluginInjector,
    {
      watch: [
        '_client/src/scss/**/*.scss',
      ],
      inject: function(eleventyInstance, options, file) {
        [
          './_client/src/scss/global.scss',
          './_client/src/scss/home.scss',
          './_client/src/scss/archive.scss',
          './_client/src/scss/post.scss',
          './_client/src/scss/code.scss',
        ].forEach( async (entry) => {
          const basename = path.basename(entry, '.scss');
          const cssPath = path.resolve(paths.public, `css/${basename}.css`);

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
        });
      }
    }
  );

  // Add syntax highlighting.
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(svgContents);

  // Copy the directories.
  eleventyConfig.addPassthroughCopy({
    '_client/src/images/**/*.ico': '.',
    '_client/src/images': 'images',
    '_client/src/fonts': 'fonts',
  });

  // Don't use the gitignore file.
  eleventyConfig.setUseGitIgnore(false);

  // Shortcodes.
  eleventyConfig.addShortcode('account', account);
  eleventyConfig.addPairedShortcode('figure', figure);

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
