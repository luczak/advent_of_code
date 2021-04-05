import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const TOTAL = 150;

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const containers = input.split('\n').map(Number);

const combinations = new Set();
let options = 0;

for (const containerId in containers) {
    distribute(containerId);
}

function distribute(containerId, filled = [], left = TOTAL) {
    filled.push(containerId);
    left -= containers[containerId];
    const string = JSON.stringify(filled.sort((a,b) => a - b));
    if (combinations.has(string) || left < 0) { return; }
    combinations.add(string);
    if (left === 0) {
        options++;
        return;
    }
    for (let id in containers) {
        if (filled.includes(id)) { continue; }
        distribute(id, [...filled], left);
    }
}
console.log(options);


