import {pathTemplates} from "./pathTemplates.js";

export const getDirName = (filepath, dir, sep = "\\") => {
    const parts = filepath.split(sep);
    const index = parts.indexOf(dir);
    if (index === -1) {
        return filepath
    } else {
        for (let i = 0; i < index + 1; i++) {
            parts.shift();
        }
        return parts.reduce((prev, curr) => {
            prev += sep + curr
            return prev;
        }, "");
    }
}

export const replaceAliases = (relPath) => {
    let result = relPath;
    result = relPath.replace("@components", "components")
    return result;
}

export const defaultRenameFunction = (filepath) => {
    if (filepath.dirname.includes("fonts")) {
        filepath.dirname = filepath.dirname.split("\\")
            .reduce((prev, curr, index) => {
                return index === 1 ? curr : prev+"\\"+curr;
            })
    }
    if (filepath.dirname.includes("components")) {
        if (filepath.dirname.includes("assets")) {
            filepath.dirname = filepath.dirname.split("\\")
                .reduce((prev, curr, index, array) => {
                    return index < array.length - 2 ? `${prev}\\${curr}` : prev;
                });
        }
    } else {
        if (filepath.dirname.includes("images")) {
            filepath.dirname = filepath.dirname.split("\\")
                .reduce((prev, curr, index) => {
                    return index === 1 ? curr : prev+"\\"+curr;
                })
        }
    }
    return filepath;
}
