export const copyScripts = () => {
  return app.gulp.src(app.path.src.filesScripts)
    .pipe(app.gulp.dest(app.path.build.filesScripts))
}

export const copyStyles = () => {
  return app.gulp.src(app.path.src.filesStyles)
    .pipe(app.gulp.dest(app.path.build.filesStyles))
}