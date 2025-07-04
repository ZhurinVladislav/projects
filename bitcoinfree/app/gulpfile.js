const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");

function css() {
	return src('./sass/style.sass')
		.pipe(sass().on('error', notify.onError({
			message: "<%= error.message %>",
			title  : "Sass Error!"
		})))
		.pipe(minifyCSS())
		.pipe(autoprefixer())
		.pipe(dest('css'))
}

exports.css = css;
exports.default = parallel(css);


watch(['./sass/**/*.sass'], function(cb) {
  css();
  cb();
});