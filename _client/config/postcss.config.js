/* eslint-disable import/no-extraneous-dependencies */
// Plugin imports
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const modules = require('postcss-modules');

// Config
module.exports = () => ({
  plugins: [
    autoprefixer(),
    modules({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      getJSON: (cssFileName, json) => {
        const cssName = path.basename(cssFileName, '.css');
        const jsonFileName = path.resolve(`./build/${cssName}.json`);
        fs.writeFileSync(jsonFileName, JSON.stringify(json));
      },
    }),
  ],
});
