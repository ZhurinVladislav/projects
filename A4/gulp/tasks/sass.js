import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer' // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групировка медиа запросов

const sassMain = gulpSass(dartSass);

export const sass = () => {
  return app.gulp.src(app.path.src.sass, { sourcemaps: true})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SASS",
        message: "Error: <%= error.message %>"
      })))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sassMain({
      outputStyle: 'expanded'
    }))
    .pipe(groupCssMediaQueries())
    .pipe(webpcss(
      {
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      }
    ))
    .pipe(autoprefixer({
      grid: "true",
      overrideBrowserslist: ["last 3 versions"],
      cascade: true
    }))
    // Раскомментировать если нужен не сжатый дубль файла стилей
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}