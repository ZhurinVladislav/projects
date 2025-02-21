// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./app`;
const srcFolder = `./src`;
const srcProject = `./`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${srcProject}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    filesScripts: `${buildFolder}/js/libs/`,
    filesStyles: `${buildFolder}/css/libs/`,
  },
  src: {
    js: `${srcFolder}/js/index.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    sass: `${srcFolder}/sass/style.sass`,
    html: `${srcFolder}/*.html`,
    filesScripts: `${srcFolder}/js/libs/**/*.*`,
    filesStyles: `${srcFolder}/sass/libs/**/*.*`,
    svgicons: `${srcFolder}/img/svgicons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    sass: `${srcFolder}/sass/**/*.sass`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    filesScripts: `${srcFolder}/js/libs/**/*.*`,
    filesStyles: `${srcFolder}/sass/libs/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
