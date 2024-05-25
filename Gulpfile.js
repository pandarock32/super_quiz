import gulp from "gulp";
import {clearDist, copy, copyFonts, copyIMG, copyJS} from "./gulp/tasks/index.js";
import {buildPage} from "./gulp/tasks/buildPage.js";
import {pathTemplates} from "./gulp/config/pathTemplates.js";
import {buildStyles} from "./gulp/tasks/buildStyles.js";
import {server} from "./gulp/tasks/server.js";

const watch = () => {
    gulp.watch(pathTemplates.src.components.html, buildPage)
    gulp.watch(pathTemplates.src.scss, gulp.series(buildStyles, buildPage))
    gulp.watch(pathTemplates.src.js, gulp.series(copyJS, buildPage))
    gulp.watch(pathTemplates.src.fonts, copyFonts)
    gulp.watch(pathTemplates.src.img, copyIMG)
    gulp.watch(pathTemplates.src.html, buildPage)
}

const buildTasks = [
    clearDist,
    buildStyles,
    ...copy,
    buildPage,
]

const defaultSeries = gulp.series(...buildTasks, gulp.parallel(watch, server));

gulp.task("default", defaultSeries);