import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";
import path from "path";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const directions = input.split('');

const visitedHouseCoordinates = new Set(['0/0']);
let active = { x: 0, y: 0 };
let waiting = { x: 0, y: 0 };
directions.forEach((direction) => {
    switch (direction) {
        case '>': active.x++; break;
        case '<': active.x--; break;
        case '^': active.y++; break;
        case 'v': active.y--; break;
    }
    visitedHouseCoordinates.add(`${active.x}/${active.y}`);
    [active, waiting] = [waiting, active];
});
console.log(visitedHouseCoordinates.size);
