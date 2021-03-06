'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    srcmap = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    prefixer = require('autoprefixer'),
    postfocus = require('postcss-focus'),
    cssnano = require('cssnano'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    images = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    svgo = require('gulp-svgo'),
    pngmin = require('gulp-pngquant'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['jpgmin', 'pngmin', 'svgo', 'jsLibsMin', 'cssLibsMin', 'style', 'watch'], function() {
  browserSync.init({
    server: 'src/'
  })
});

gulp.task('jpgmin', function() {
  return gulp.src('src/img/**/*.jpg')
    .pipe(images(
      jpegrecompress({
        progressive: true,
        max: 80,
        min: 70
      })
    ))
    .pipe(gulp.dest('src/img'));
});

gulp.task('pngmin', function() {
  return gulp.src('src/img/**/*.png')
    .pipe(pngmin({
      quality: '65-80'
    }))
    .pipe(gulp.dest('src/img'));
})

gulp.task('svgo', function() {
  return gulp.src('src/img/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('src/img'));
})

gulp.task('cssLibsMin', function() {
  return gulp.src([
    'src/libs/**/**/{*.scss, *.sass}'
  ])
    .pipe(sass())
    .pipe(postcss([prefixer, cssnano]))
    .pipe(rename('libs.min.css'))
    .pipe(gulp.dest('src/libs'))
})

gulp.task('jsLibsMin', function() {
  return gulp.src([
    'src/libs/jquery/jquery-3.3.1.js',
    'src/libs/slick-1.8.1/slick/slick.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/libs'));
});

gulp.task('style', function() {
  gulp.src('src/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }).on('error', notify.onError()))
    .pipe(concat('style.css'))
    .pipe(srcmap.init())
    .pipe(postcss([prefixer, postfocus, cssnano]))
    .pipe(srcmap.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.sass', ['style']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('build');
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
  .pipe(gulp.dest('build/img'));
});

gulp.task('build', [

]);

gulp.task('default', ['serve']);
