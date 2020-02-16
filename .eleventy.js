module.exports = function(eleventyConfig) {
  // https://www.11ty.dev/docs/custom-tags/#liquidjs-example
  // https://www.11ty.dev/docs/plugins/syntaxhighlight/

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
