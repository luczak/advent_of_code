import { readInput } from "../../common/read-input.js";

const STARTING_VALUE = 20151125n;
const MULTIPLIER = 252533n;
const DIVIDER = 33554393n;

const input = await readInput(import.meta.url, './input.txt');
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