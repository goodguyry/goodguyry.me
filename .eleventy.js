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

  eleventyConfig.addShortcode('account', function(site) {
    const urls = {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      codepen: 'https://codepen.io',
    };

    if (undefined === urls[site]) {
      return '';
    }

    return `${urls[site]}/goodguyry`;
  });

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
