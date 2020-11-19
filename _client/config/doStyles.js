/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const sass = require('sass');
const postcss = require('postcss');
const units = require('postcss-units');
const modules = require('postcss-modules');
const tidyColumns = require('postcss-tidy-columns');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const paths = require('./paths');
const yamlDictFromObject = require('./bin/yamlDictFromObject');

/**
 * Process Sass styles.
 *
 * @param  {string} inputFile Absolute path to the input file.
 * @return {string}           Processed CSS.
 */
module.exports = async (inputFile) => {
  const { css } = await sass.renderSync({
    file: inputFile,
    includePaths: [
      paths.scss,
    ],
  });

  return postcss([
    units(),
    tidyColumns({
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
            modulesMap = JSON.parse(fs.readFileSync(
              path.join(paths.siteData, 'classnames.json'),
              'utf8'
            ));
          } catch (error) {
            modulesMap = {};
          }

          modulesMap[name] = json;
          fs.writeFileSync(
            path.join(paths.siteData, 'classnames.json'),
            JSON.stringify(yamlDictFromObject(modulesMap))
          );
        }
      },
    }),
    autoprefixer(),
    cssnano(),
  ])
    .process(css.toString(), { from: inputFile })
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });

      return result.css;
    });
};
