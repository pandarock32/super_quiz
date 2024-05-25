import {plugins} from "../config/plugins.js";
import {pathTemplates} from "../config/pathTemplates.js";

export const server = (done) => {
    plugins.browserSync.init({
        server: {
            baseDir: `${pathTemplates.build.folder}`
        },
        notify: false,
        port: 3000
    })
}