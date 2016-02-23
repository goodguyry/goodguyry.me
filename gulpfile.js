// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var penthouse = require('penthouse');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var map = require('vinyl-map');
var fs = require('fs');

gulp.task('penthouse', function() {
  // Home page
  penthouse({
      url : 'http://goodguyry.dev',
      css : '_site/css/base.css',
      width : 720,
      height : 800,
      forceInclude : ['nav', 'footer'],
      timeout: 30000,
      strict: false,
      maxEmbeddedBase64Length: 1000
  }, function(err, criticalCss) {
      fs.writeFileSync('css/_critical-home.css', criticalCss);
  });

  // Blog post
  penthouse({
      url : 'http://goodguyry.dev/notes/multi-tenant-wordpress.html',
      css : '_site/css/base.css',
      width : 720,
      height : 800,
      forceInclude : ['nav'],
      timeout: 30000,
      strict: false,
      maxEmbeddedBase64Length: 1000
  }, function(err, criticalCss) {
      fs.writeFileSync('css/_critical-post.css', criticalCss);
  });

});

// Finish Processing CriticalCSS
gulp.task('styles', ['penthouse'], function() {
  var wrapCritical = map(function(content, filename) {
    content = content.toString();
    // Wrap minified CSS in <style> tags
    return '<style>' + content + '</style>';
  })

  return gulp.src('css/_critical*.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.gulp',
      extname: '.html'
    }))
    // Wrap minified CSS in <style> tags
    .pipe(wrapCritical)
    .pipe(gulp.dest('./_includes'));
});
