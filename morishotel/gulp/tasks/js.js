import webpack from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        tittle: "JS",
        message: "Error: <%= error.message %>"
      }))
    )
    // Раскомментировать если нужен не сжатый дубль файла стилей
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: 'main.min.js',
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}