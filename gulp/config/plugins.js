import npmFiles from "gulp-npm-files";
import rename from "gulp-rename";
import flatten from "gulp-flatten";
import inject from "gulp-inject";
import replace from "gulp-replace";
import gulpTransform from "gulp-transform";
import sass from "gulp-sass";
import browserSync from "browser-sync";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

export const plugins = {
    npmFiles: npmFiles,
    rename: rename,
    flatten: flatten,
    inject: inject,
    replace: replace,
    transform: gulpTransform,
    sass: sass,
    browserSync: browserSync,
    pug: pug,
    plumber: plumber,
    notify: notify
}