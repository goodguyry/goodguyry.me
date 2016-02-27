var gulp = require('gulp');

var penthouse = require('penthouse');
var nano = require('cssnano');
var fs = require('fs');

var nanoOpts = {
  autoprefixer : {
    add : true
  }
};

gulp.task('critical', ['styles'], function() {

  // Strings for different templates
  var templates = {
    home : {
      url : 'http://goodguyry.dev',
      css : './css/base.min.css',
      forceInclude : [/^nav\s*/, /footer\s*/],
      outfile : './_includes/critical-home.html'
    },
    post : {
      url : 'http://goodguyry.dev/notes/multi-tenant-wordpress.html',
      css : './css/base.min.css',
      forceInclude : [/^nav\s*/],
      outfile : './_includes/critical-post.html'
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
      nano.process(critical, nanoOpts).then(function (result) {
        // Wrap output in <style> tags
        fs.writeFileSync(templates[key].outfile, '<style>' + result.css + '</style>');
      });
    });
  });

});

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
  return gulp.src('./_loadCSS/loadCSS.js')
    .pipe(uglify())
    .pipe(rename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./_includes/'));
});

var sass = require('gulp-sass');
var gulpNano = require('gulp-cssnano');

gulp.task('styles', function () {
  return gulp.src('./_scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpNano(nanoOpts))
    .pipe(rename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', ['scripts', 'critical']);
