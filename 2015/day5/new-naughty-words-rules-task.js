import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const strings = input.split('\n');
const niceStrings = strings.filter(word =>
    /(.{2}).*?\1/.test(word) &&
    /(.).\1/.test(word)
);

console.log(niceStrings.length)
