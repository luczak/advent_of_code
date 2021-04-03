import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('');

for (let floorNumber = 0, i = 0; i < instructions.length; i++) {
    const char = instructions[i];
    floorNumber += char === '(' ? 1 : -1;
    if (floorNumber < 0) {
        console.log(i + 1);
        break;
    }
}