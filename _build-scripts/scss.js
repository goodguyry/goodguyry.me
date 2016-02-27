var sass = require('node-sass');
var nano = require('cssnano');
var fs = require('fs');

/**
 * Compile base site styles
 * - Outputs to cssnano for minifying and prefixing
 */
sass.render({
  file : './_scss/base.scss',
  includePaths : [ './_scss/partials' ],
  outputStyle : 'expanded'
}, function(err, result) {
  if (err) {
    // Display errors
    console.log(err.status);
    console.log(err.column);
    console.log(err.message);
    console.log(err.line);
  } else {
    // Minify the output
    nano.process(result.css, {
      autoprefixer : {
        add : true // Add vendor prefixes
      }
    }).then(function (result) {
      // Write the minified CSS to disk
      fs.writeFile('./css/base.min.css', result.css, function(err) {
        if (err) { throw err; }
      });
    });
  }
});

/**
 * Compile syntax highlighting styles
 */
sass.render({
  file : './_scss/code.scss',
  outputStyle : 'expanded'
}, function(err, result) {
  if (err) {
    // Display errors
    console.log(err.status);
    console.log(err.column);
    console.log(err.message);
    console.log(err.line);
  } else {
    // Minify the output
    nano.process(result.css, {}).then(function (result) {
      // Write the minified CSS to disk
      fs.writeFile('./css/code.min.css', result.css, function(err) {
        if (err) { throw err; }
      });
    });
  }
});
