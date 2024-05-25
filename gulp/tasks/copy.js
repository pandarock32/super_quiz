import gulp from "gulp";
import {pathTemplates} from "../config/pathTemplates.js";
import {plugins} from "../config/plugins.js";
import {defaultRenameFunction, getDirName} from "../config/trait.js";
import * as path from "path";
import * as fs from "fs";


export const copyJS = () => {
    return gulp.src(pathTemplates.src.js)
        .pipe(plugins.rename(defaultRenameFunction))
        .pipe(gulp.dest(pathTemplates.build.assets.js))
}

export const copyFonts = () => {
    return gulp.src(pathTemplates.src.fonts, {buffer: true})
        .pipe(plugins.transform((contents, file) => {
            return copyFiles(pathTemplates.build.assets.fonts, contents, file);
        }))
    //.pipe(plugins.rename(defaultRenameFunction))
    //.pipe(gulp.dest(pathTemplates.build.assets.fonts))
}

export const copyIMG = () => {
    return gulp.src(pathTemplates.src.img, {buffer: true})
        //.pipe(plugins.rename(defaultRenameFunction))
        .pipe(plugins.transform((contents, file) => {
            return copyFiles(pathTemplates.build.assets.img, contents, file);
        }))
}

export const copyLibs = (done) => {
    const files = plugins.npmFiles();
    if (files.length === 0) {
        return done();
    }
    return gulp.src(files)
        .pipe(plugins.rename(filepath => {
            filepath.dirname = getDirName(filepath.dirname, "node_modules");
        }))
        .pipe(gulp.dest(pathTemplates.build.assets.libs))
}

function copyFiles(targetPath, contents, file) {
    const dirname = path.dirname(file.path.substring(file.base.length + 1));

    let dir = defaultRenameFunction({dirname: dirname}).dirname;
    const targetDir = path.join(targetPath, dir)
    targetDir.split("\\").reduce((previousValue, currentValue, currentIndex, array) => {
        if (currentIndex < array.length-1) {
            const subdir = path.join(path.dirname(file.base), previousValue + "\\" + currentValue);
            if (!fs.existsSync(subdir)) {
                fs.mkdirSync(subdir);
            }
        }
        return previousValue + "\\" + currentValue;
    })

    const target = `${path.join(path.dirname(file.base), targetDir, file.basename)}`;

    if (!fs.existsSync(path.dirname(target))) {
        fs.mkdirSync(path.dirname(target));
    }
    fs.copyFileSync(file.path, target);
    console.log("COPIED", target)
    return contents;
}

export const copy = [copyJS, copyFonts, copyIMG, copyLibs];