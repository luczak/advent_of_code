import fs from "fs";

export function readTextFile(path, encoding = 'utf8') {
    return fs.promises.readFile(path, { encoding });
}