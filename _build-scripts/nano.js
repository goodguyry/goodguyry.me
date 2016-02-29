var nano = require('cssnano');
var fs = require('fs');

var files = {
  base: {
    in: './_site/css/base.css',
    out: './_site/css/base.min.css'
  },
  code: {
    in: './_site/css/code.css',
    out: './_site/css/code.min.css'
  }
};

// Looop through compiled CSS files
Object.keys(files).forEach(function(key) {
  // Read the file and pass to CSSNano
  fs.readFile(files[key].in, 'utf8', function (err, data) {
    if (err) {
      throw err;
    } else {
      // Minify and prefix
      nano.process(data, {
        autoprefixer : {
          add : true // Add vendor prefixes
        }
      }).then(function (result) {
        // Write the minified CSS to disk
        fs.writeFile(files[key].out, result.css, function(err) {
          if (err) { throw err; }
        });
      });
    }
  });

});
