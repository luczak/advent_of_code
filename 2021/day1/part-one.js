import path from 'path';
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const depths = input.split('\n').map(Number);
let counter = 0;

for (let i = 1; i < depths.length; i++) {
    const prev = depths[i - 1];
    const current = depths[i];
    if (current > prev) {
        counter++;
    }
}

console.log(counter);
