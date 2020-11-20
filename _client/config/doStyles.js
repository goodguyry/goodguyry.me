/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const sass = require('sass');
const postcss = require('postcss');
const tidyColumns = require('postcss-tidy-columns');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const paths = require('./paths');

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
