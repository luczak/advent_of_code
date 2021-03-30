import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const boxes = input.split('\n');

let total = 0;
boxes.forEach(b => {
    const edges = b.split('x').map(Number);
    total += edges.reduce((product, e) => product * e, 1);

    const longestEdge = Math.max(...edges);
    const index = edges.indexOf(longestEdge);
    edges.splice(index, 1);
    total += edges.reduce((product, e) => product + 2 * e, 0);
});
console.log(total);