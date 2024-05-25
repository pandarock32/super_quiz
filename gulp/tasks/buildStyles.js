import {pathTemplates} from "../config/pathTemplates.js";
import gulp from "gulp";
import * as dartSass from "sass"
import {plugins} from "../config/plugins.js";
import {defaultRenameFunction} from "../config/trait.js";

const sass = plugins.sass(dartSass);

export const buildStyles = () => {
    return gulp.src(pathTemplates.src.scss)
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "SCSS compile",
                message: "<%= error.message %>"
            })
        ))
        .pipe(plugins.replace(/@@([^/"]+)/g, function (match, key) {
            if (pathTemplates.scss.hasOwnProperty(key)) {
                return `${pathTemplates.scss[key]}`;
            }
            return match;
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(plugins.rename(defaultRenameFunction))
        .pipe(gulp.dest(pathTemplates.build.assets.css))
}