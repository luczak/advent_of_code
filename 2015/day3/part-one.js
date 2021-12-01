import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const directions = input.split('');

const visitedHouseCoordinates = new Set(['0/0']);
const coordinates = { x: 0, y: 0 };
directions.forEach(direction => {
    switch (direction) {
        case '>': coordinates.x++; break;
        case '<': coordinates.x--; break;
        case '^': coordinates.y++; break;
        case 'v': coordinates.y--; break;
    }
    visitedHouseCoordinates.add(`${coordinates.x}/${coordinates.y}`);
});

console.log(visitedHouseCoordinates.size);