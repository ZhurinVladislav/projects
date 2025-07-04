var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");
var cleanCSS = require('gulp-clean-css');
var svgSprite = require('gulp-svg-sprites');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('./sass/style.sass')
    .pipe(sass().on('error', notify.onError({
      message: "<%= error.message %>",
      title  : "Sass Error!"
    })))
    .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'http://bedtc/',
    port: 7700,
    open: false,
    notify: true
  });
});

// gulp.task('svg', function() {
//  return gulp.src('./images/svg/*.svg')
//    .pipe(cheerio({
//      //  убираем заливку, инлайновые стили и теги со стилями
//      run: function($) {
//        $('[fill]').removeAttr('fill');
//        $('[style]').removeAttr('style');
//        $('style').remove();
//      },
//      parserOptions: {xmlMode: true}
//    }))
//    .pipe(replace('&gt;', '>'))
//    .pipe(svgSprite({
//      mode: 'symbols',
//      preview: false,
//      selector: '%f',
//      svg: {
//        symbols: 'sprite.svg'
//      }
//    }))
//    .pipe(gulp.dest('./images/'));
// });

gulp.task('default', ['sass'], function() {
  gulp.watch('./sass/**/*.sass', ['sass']);
});
