const copydir = require('copy-dir');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const svgContents = require('eleventy-plugin-svg-contents');
const writeCSS = require('./_client/config/writeCSS');
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
  eleventyConfig.on('beforeBuild', writeCSS);
  // Manually copy CSS directory to ensure it arrives.
  eleventyConfig.on('afterBuild', () => {
    console.log('Copying _client/src/css to _site/assets/css');
    copydir('./_client/src/css', './_site/assets/css', { cover: false });
  });

  // Plugins.
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(svgContents);

  // Copy the directories.
  eleventyConfig.addPassthroughCopy({
    '_client/src/images/**/*.ico': '.',
    '_client/src/images': 'assets/images',
    '_client/src/fonts': 'assets/fonts',
  });

  // Don't use the gitignore file.
  eleventyConfig.setUseGitIgnore(false);

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
