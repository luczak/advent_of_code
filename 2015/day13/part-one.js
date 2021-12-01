import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('\n');
const relations = new Map();

instructions.forEach(instruction => {
    const words = instruction.split(' ');
    const target = words[0];
    const relative = words[words.length - 1].slice(0, -1);
    const points = instruction.match(/\d+/);
    const score = instruction.includes('gain') ? +points : -points;
    if (!relations.has(target)) { relations.set(target, new Map()); }
    relations.get(target).set(relative, score);
});

const relatives = Array.from(relations.keys());
let highScore = -Infinity;
const start = relatives[0];
assignSeats(start);

function assignSeats(relative, order = [], score = 0) {
    if (order.includes(relative)) { return; }
    order.push(relative);
    if (order.length === relatives.length) {
        score += relations.get(order[0]).get(relative) + relations.get(relative).get(order[0]);
        return highScore = Math.max(highScore, score);
    }
    relations.forEach((connections, target) => {
        assignSeats(target, Array.from(order), score + connections.get(relative) + relations.get(relative).get(target));
    });
}
console.log(highScore);