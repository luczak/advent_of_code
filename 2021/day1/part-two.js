import path from 'path';
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const depths = input.split('\n').map(Number);

let counter = 0;
let prev = null;

for (let i = 0; i < depths.length - 2; i++) {
    const window = depths.slice(i, i + 3);
    const sum = window.reduce((sum, depth) => sum + depth, 0);
    if (prev && sum > prev) {
        counter++;
    }
    prev = sum;
}

console.log(counter);
