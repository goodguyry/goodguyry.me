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

  // Plugins.
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
