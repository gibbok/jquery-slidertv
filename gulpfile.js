const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const stylish = require('gulp-jscs-stylish');
const gulpJsdoc2md = require('gulp-jsdoc-to-markdown')
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const fs = require('fs');

/**
 * Run Connect Server.
 */
gulp.task('connect', function () {
    connect.server({
        root: ""
    });
});

/**
 * Open examples in the browser.
 */
gulp.task('examples', function () {
    open('http://localhost:8080/examples/horizontal.html');
    open('http://localhost:8080/examples/vertical.html');
});

/**
 * Validate source code using jscs and jshint.
 */
gulp.task('checkcode', function () {
    gulp.src('.')
        .pipe(jshint())
        .pipe(jscs())
        .on('error', function () { })
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Create documentation in markdown format.
 */
gulp.task('docs', function () {
    return gulp.src('sliderTV.js')
      .pipe(gulpJsdoc2md())
      .on('error', function (err) {
          gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
      })
      .pipe(rename(function (path) {
          path.extname = '.md'
      }))
      .pipe(gulp.dest('docs'))
});

/**
 * Minify code.
 */
gulp.task('compress', function () {
    return gulp.src('sliderTV.js')
      .pipe(uglify({ output: { comments: /^!/i } }))
      .pipe(gulp.dest('dist'));
});

/**
 * Default action.
 */
gulp.task('default', ['compress', 'docs'], function () { });
