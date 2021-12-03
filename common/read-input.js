import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

export function readInput(scriptUrl, inputPath) {
    const dirPath = getDirPath(scriptUrl);
    return readTextFile(path.resolve(dirPath, inputPath));
}

function getDirPath(fileUrl) {
    const filePath = fileURLToPath(fileUrl);
    return dirname(filePath);
}

function readTextFile(path, encoding = 'utf8') {
    return fs.promises.readFile(path, { encoding });
}
