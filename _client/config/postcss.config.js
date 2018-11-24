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
        const { name } = path.parse(cssFileName);
        const output = path.join(__dirname, '../../build');
        let modulesMap;

        try {
          modulesMap = JSON.parse(fs.readFileSync(
            path.join(output, 'classnames.json'),
            'utf8'
          ));
        } catch (error) {
          modulesMap = {};
        }

        modulesMap[name] = json;
        fs.writeFileSync(
          path.join(output, 'classnames.json'),
          JSON.stringify(modulesMap)
        );
      },
    }),
  ],
});
