export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      // baseDir: `${app.path.build.html}`
      // baseDir: `${app.path.src.htmlProject}`
      baseDir: './'
    },
    notify: false,
    port: 3000,
  });
}