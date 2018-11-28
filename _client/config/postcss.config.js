const path = require('path');
const fs = require('fs');
const readYaml = require('read-yaml');
const autoprefixer = require('autoprefixer');
const modules = require('postcss-modules');
const yamlDictFromObject = require('./bin/yamlDictFromObject');

// Config
module.exports = () => ({
  plugins: [
    autoprefixer(),
    modules({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      globalModulePaths: [
        /_client\/src\/scss\/global/,
        /_client\/entries\/code/,
      ],
      getJSON: (cssFileName, json) => {
        const { name } = path.parse(cssFileName);
        const output = path.join(__dirname, '../../_data');
        let modulesMap;

        try {
          modulesMap = readYaml.sync(
            path.join(output, 'classnames.yaml')
          );
        } catch (error) {
          modulesMap = {};
        }

        modulesMap[name] = json;
        fs.writeFileSync(
          path.join(output, 'classnames.yaml'),
          yamlDictFromObject(modulesMap)
        );
      },
    }),
  ],
});
