import {deleteAsync} from "del";
import {pathTemplates} from "../config/pathTemplates.js";


export const clearDist = () => {
    return deleteAsync(pathTemplates.build.folder)
}