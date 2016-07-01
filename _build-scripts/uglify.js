var uglify = require('uglify-js');
var fs = require('fs');

var opts = {
  loadCSS : {
    files : ['./node_modules/fg-loadcss/src/loadCSS.js', './node_modules/fg-loadcss/src/cssrelpreload.js'],
    outfile : './_includes/loadCSS.js.html',
    wrap : true
  },
  cookies : {
    files : './js/cookies.js',
    outfile : './_includes/cookies.js.html',
    wrap : true
  }
};

// Loop through the files and uglify
Object.keys(opts).forEach(function(key) {
  var result = uglify.minify(opts[key].files),
      output = result.code;

  // Conditionally wrap code in script tags
  if (opts[key].wrap) {
    output = '<script>' + output + '</script>';
  }

  // Write the files
  fs.writeFileSync(opts[key].outfile, output);
});
