// Plugins.
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes.
const codeblock = require('./.eleventy/shortcode-codeblock');
const account = require('./.eleventy/shortcode-account');

module.exports = function(eleventyConfig) {
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

  // You can return your Config object (optional).
  return {
    dir: {
      input: '.',
      layouts: '_layouts',
      data: '_data',
      output: '_site',
    }
  };
};
