

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var rigger = require('gulp-rigger');
var autoprefixer = require('gulp-autoprefixer');
var svgSprite		= require('gulp-svg-sprites');
var cheerio			= require('gulp-cheerio');
var replace			= require('gulp-replace');


gulp.task('sass', function(){
  return gulp.src('modules/main.sass')
    .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('svg', function() {
	return gulp.src('app/images/svg/*.svg')
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: 'symbols',
			preview: false,
			selector: '%f',
			svg: {
				symbols: 'svg_sprite.svg'
			}
		}))
		.pipe(gulp.dest('app/images/'));
});



gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
          baseDir: './' // Директория для сервера - app
      },
      notify: false // Отключаем уведомления
  });
});


gulp.task('scripts', function() {
  return gulp.src(['modules/main.js'])
  .pipe(rigger()) //Компилим
  .pipe(gulp.dest('app/js/')) //Папка выгрузки
  .pipe(browserSync.reload({ stream: true }))
});


gulp.task('code', function() {
  return gulp.src('*.html')
  .pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', function() {
  gulp.watch('modules/**/*.sass', gulp.parallel('sass'));
  gulp.watch('*.html', gulp.parallel('code'));
  gulp.watch(['modules/**/*.js'], gulp.parallel('scripts'));
  gulp.watch('app/images/svg/*.svg', gulp.parallel('svg'));
});
gulp.task('default', gulp.parallel('svg', 'sass','scripts', 'browser-sync', 'watch'));


