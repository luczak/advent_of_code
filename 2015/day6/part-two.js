import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";
import path from "path";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('\n');
const sideSize = 1000;
const lights = new Array(sideSize * sideSize).fill(0);

instructions.forEach(instruction => {
    const turnOn = instruction.startsWith('turn on');
    const turnOff = instruction.startsWith('turn off');
    const toggle = instruction.startsWith('toggle');
    const [x1, y1, x2, y2] = instruction.match(/\d+/g).map(Number);
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            const bulbIdentifier = x + y * sideSize;
            if (turnOn) {
                lights[bulbIdentifier] += 1;
            } else if (turnOff && lights[bulbIdentifier] > 0) {
                lights[bulbIdentifier] -= 1;
            } else if (toggle) {
                lights[bulbIdentifier] += 2;
            }
        }
    }
});

const totalLightsPower = lights.reduce((sum, light) => sum + light);
console.log(totalLightsPower);