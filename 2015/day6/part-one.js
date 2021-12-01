import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";
import path from "path";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('\n');
const size = 1000;
const lights = [];

instructions.forEach(instruction => {
    const turnOn = instruction.startsWith('turn on');
    const turnOff = instruction.startsWith('turn off');
    const [x1, y1, x2, y2] = instruction.match(/\d+/g).map(Number);
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            const bulbIdentifier = x + y * size;
            if (turnOn) {
                lights[bulbIdentifier] = true;
            } else if (turnOff) {
                lights[bulbIdentifier] = false;
            } else {
                lights[bulbIdentifier] = !lights[bulbIdentifier]
            }
        }
    }
});

console.log(lights.filter(Boolean).length)