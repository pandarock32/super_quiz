import gulp from "gulp";
import {pathTemplates} from "../config/pathTemplates.js";
import {plugins} from "../config/plugins.js";
import {replaceAliases} from "../config/trait.js";
import {glob} from "glob";
import * as fs from "fs";


const scriptInjectOptions = {
    starttag: "<!-- inject:js -->",
    relative: true,
    transform: function (filepath) {
        const dateTime = new Date().getTime().toString();
        const relPath = pathTemplates.build.assets.js.split(pathTemplates.build.folder)[1];
        return `<script src="/${relPath}/${replaceAliases(filepath)}?_v=${dateTime}" type="module"></script>`
    }
}

const styleInjectOptions = {
    starttag: "<!-- inject:css -->",
    relative: true,
    transform: function (filepath) {
        const dateTime = new Date().getTime().toString();
        const relPath = pathTemplates.build.assets.css.split(pathTemplates.build.folder)[1];
        return `<link rel="stylesheet" href="/${relPath}/${replaceAliases(filepath)}?_v=${dateTime}">`;
    }
}
const sources = {
    js: [],
    css: []
};

export const buildPage = () => {
    return gulp.src(pathTemplates.src.html)
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Build page",
                message: "Build page failed:\n <%= error.message %>"
            })
        ))
        .pipe(plugins.pug({
            pretty: false,
            verbose: false,
            locals: JSON.parse(fs.readFileSync(glob.sync(`${pathTemplates.src.folder}/index.locals.json`)[0]))
        }))
        .pipe(plugins.transform(injectStylesAndScripts))
        .pipe(plugins.replace(/<!--[\s\S]*?-->\s*|\n\s*\n/g, '')) //удалить комментарии
        .pipe(gulp.dest(pathTemplates.build.folder))
        .pipe(plugins.browserSync.stream());
}

function injectStylesAndScripts(contents, file) {
    const injectJSPlaceMark = "<!-- @injectPlaceJS-->";
    const injectCSSPlaceMark = "<!-- @injectPlaceCSS-->";

    const modules = {
        js: [],
        css: []
    }
    let str = contents.toString();
    let leftPart = str.substring(0, str.indexOf(injectJSPlaceMark));
    let rightPart = str.substring(str.indexOf(injectJSPlaceMark) + injectJSPlaceMark.length);
    for (const match of contents.toString().matchAll(/@injectJS\((.*?)\)/g)) {
        if (!modules.js.includes(match[1])) {
            leftPart += scriptInjectOptions.transform(match[1])
            modules.js.push(match[1])
        }
    }
    str = leftPart + rightPart;
    leftPart = str.substring(0, str.indexOf(injectCSSPlaceMark));
    rightPart = str.substring(str.indexOf(injectCSSPlaceMark) + injectCSSPlaceMark.length);
    for (const match of contents.toString().matchAll(/@injectCSS\((.*?)\)/g)) {
        if (!modules.css.includes(match[1])) {
            leftPart += styleInjectOptions.transform(match[1])
            modules.css.push(match[1])
        }
    }
    return Buffer.from(leftPart + rightPart);
}