var gulp = require('gulp');
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

var nanoOpts = {
  autoprefixer : {
    add : true
  }
};

gulp.task('styles', function () {
  return gulp.src('./_scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpNano(nanoOpts))
    .pipe(rename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', ['scripts', 'styles']);
