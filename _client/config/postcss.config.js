const path = require('path');
const fs = require('fs');
const readYaml = require('read-yaml');
const autoprefixer = require('autoprefixer');
const modules = require('postcss-modules');
const columns = require('postcss-tidy-columns');
const paths = require('./paths');
const yamlDictFromObject = require('./bin/yamlDictFromObject');

// Config
module.exports = () => ({
  plugins: [
    columns({
      columns: 8,
      gap: '0.375rem',
      edge: '1.25rem',
      breakpoints: {
        '48rem': {
          gap: '1rem',
          siteMax: '39.625rem',
        },
      },
    }),
    autoprefixer(),
    modules({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      globalModulePaths: [
        /_client\/src\/scss\/global/,
        /_client\/entries\/code/,
      ],
      getJSON: (cssFileName, json) => {
        const { name } = path.parse(cssFileName);
        let modulesMap;

        if (0 < Object.keys(json).length) {
          try {
            modulesMap = readYaml.sync(
              path.join(paths.siteData, 'classnames.yaml')
            );
          } catch (error) {
            modulesMap = {};
          }

          modulesMap[name] = json;
          fs.writeFileSync(
            path.join(paths.siteData, 'classnames.yaml'),
            yamlDictFromObject(modulesMap)
          );
        }
      },
    }),
  ],
});
