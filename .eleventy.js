const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // https://www.11ty.dev/docs/custom-tags/#liquidjs-example
  // https://www.11ty.dev/docs/plugins/syntaxhighlight/

  // Add syntax highlighting.
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setUseGitIgnore(false);

  // You can return your Config object (optional).
  return {
    dir: {
      input: '.',
      layouts: '_layouts',
      data: '_data',
      output: 'dist',
    }
  };
};
