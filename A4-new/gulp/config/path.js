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
    // html: `${buildFolder}/`,
    html: `${srcProject}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/js/libs/`,
    // files: `${buildFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/main.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    sass: `${srcFolder}/sass/main.sass`,
    html: `${srcFolder}/*.html`,
    // htmlProject: `${srcFolder}/`,
    // html: `${srcProject}/*.html`,
    // files: `${srcFolder}/files/**/*.*`,
    files: `${srcFolder}/js/libs/**/*.*`,
    svgicons: `${srcFolder}/img/svgicons/*.svg`,
  },
  watch: {
    js:`${srcFolder}/js/**/*.js`,
    sass: `${srcFolder}/sass/**/*.sass`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    // files: `${srcFolder}/files/**/*.*`,
    files: `${srcFolder}/js/libs/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
}