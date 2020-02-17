const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // https://www.11ty.dev/docs/custom-tags/#liquidjs-example
  // https://www.11ty.dev/docs/plugins/syntaxhighlight/

  // Add syntax highlighting.
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy the `build/` directory.
  eleventyConfig.addPassthroughCopy('build');

  // Don't use the gitignore file.
  eleventyConfig.setUseGitIgnore(false);

  /**
   * Adds an account tag
   * {% account 'twitter' %}
   * -> 'https://twitter.com/godguyry'
   *
   * @param  {string} site The site for which the account URL should be retrieved.
   * @return {string}
   */
  eleventyConfig.addShortcode('account', function(site) {
    const urls = {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      codepen: 'https://codepen.io',
    };

    const { [site]: baseUrl } = urls;

    if (undefined !== baseUrl) {
      return `${baseUrl}/goodguyry`;
    }

    return '';
  });

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
