import * as nodePath from "path";


const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./dist";
const srcFolder = "./src";
const assetsFolder = `${buildFolder}/assets`;
const componentsFolder = `${srcFolder}/components`

export const pathTemplates = {
    build: {
        folder: `${buildFolder}/`,
        index: `${buildFolder}/index.html`,
        assets: {
            js: `${assetsFolder}/js`,
            css: `${assetsFolder}/css`,
            fonts: `${assetsFolder}/fonts`,
            img: `${assetsFolder}/img`,
            libs: `${assetsFolder}/libs`,
        }
    },
    src: {
        scss: `${srcFolder}/**/*.scss`,
        folder: srcFolder,
        components: {
            folder: componentsFolder,
            js: `${componentsFolder}/**/*.js`,
            css: `${componentsFolder}/**/*.css`,
            html: `${componentsFolder}/**/*.pug`
        },
        html: `${srcFolder}/*.pug`,
        js: `${srcFolder}/**/*.js`,
        css: `${srcFolder}/**/*.css`,
        fonts: `${srcFolder}/**/*.{ttf,otf}`,
        img: `${srcFolder}/{images/**,components/**}/*.{png,jpg,jpeg,webp,ico,svg}`,
        libs: `${srcFolder}/libs/*.*`
    },
    scss: {
        vars: `src/variables.scss`,
        img: `/assets/img`,
        fonts: "/assets/fonts",
    },
    rootFolder: rootFolder,
    ftp: ""
}