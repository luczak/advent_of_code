import * as path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const STARTING_VALUE = 20151125n;
const MULTIPLIER = 252533n;
const DIVIDER = 33554393n;

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const [y, x] = input.match(/\d+/g).map(Number);
const target = { x, y };


const current = { x: 0, y: 0 };
let maxY = 0;
let value = STARTING_VALUE;

while (current.x !== target.x - 1 || current.y !== target.y - 1) {
    nextCoordinate(current);
    value = nextValue(value);
}

console.log(current);
console.log(value);

function nextCoordinate(point) {
    const { x, y } = point;
    point.x = y > 0 ? x + 1 : 0;
    point.y = y > 0 ? y - 1 : ++maxY;
}

function nextValue(n) {
    return n * MULTIPLIER % DIVIDER;
}