var gulp = require('gulp');

var penthouse = require('penthouse');
var nano = require('cssnano');
var fs = require('fs');

gulp.task('critical', function() {

  // Strings for different templates
  var templates = {
    home : {
      url : 'http://goodguyry.dev',
      css : '_site/css/base.css',
      forceInclude : ['nav', 'footer'],
      outfile : '_includes/critical-home.html'
    },
    post : {
      url : 'http://goodguyry.dev/notes/multi-tenant-wordpress.html',
      css : '_site/css/base.css',
      forceInclude : ['nav'],
      outfile : '_includes/critical-post.html'
    }
  };

  // Loop through the templates and generate criticalCSS for each
  Object.keys(templates).forEach(function(key) {
    penthouse({
      url : templates[key].url,
      css : templates[key].css,
      width : 720,
      height : 800,
      forceInclude : templates[key].forceInclude,
      timeout : 30000
    }, function(err, critical) {
      // Minify the output
      nano.process(critical, { autoprefixer : { add : true } }).then(function (result) {
        // Wrap output in <style> tags
        fs.writeFileSync(templates[key].outfile, '<style>' + result.css + '</style>');
      });
    });
  });

});

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
  return gulp.src('_loadCSS/loadCSS.js')
    .pipe(uglify())
    .pipe(rename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./_includes/'));
});
