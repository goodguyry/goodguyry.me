// Plugins.
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes.
const codeblock = require('./.eleventy/shortcode-codeblock');
const account = require('./.eleventy/shortcode-account');

module.exports = function(eleventyConfig) {
  // The Config object.
  const dir = {
    layouts: '_layouts',
  };

  // Add syntax highlighting.
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy the `build/` directory.
  eleventyConfig.addPassthroughCopy('build');

  // Don't use the gitignore file.
  eleventyConfig.setUseGitIgnore(false);

  // Shortcodes.
  eleventyConfig.addShortcode('account', account);
  eleventyConfig.addPairedShortcode('codeblock', codeblock);

  // Override BrowserSync options.
  eleventyConfig.setBrowserSyncConfig({
    server: false,
    proxy: 'http://goodguyry.http',
  });

  return { dir };
};
