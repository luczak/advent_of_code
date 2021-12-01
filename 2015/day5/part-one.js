import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const strings = input.split('\n');
const niceStrings = strings.filter(word =>
    word.match(/[aeiou]/g)?.length >= 3 &&
    /(.)\1/.test(word) &&
    !/(ab|cd|pq|xy)/.test(word)
);

console.log(niceStrings.length)