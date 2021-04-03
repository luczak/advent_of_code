import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

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
console.log(highScore);

function assignSeats(relative, order = [], score = 0, worstRelation = Infinity) {
    if (order.includes(relative)) { return; }
    order.push(relative);
    if (order.length === relatives.length) {
        const change = relations.get(order[0]).get(relative) + relations.get(relative).get(order[0]);
        score += change;
        score -= Math.min(change, worstRelation);
        return highScore = Math.max(highScore, score);
    }
    relations.forEach((connections, target) => {
        const change = connections.get(relative) + relations.get(relative).get(target);
        assignSeats(target, Array.from(order), score + change, Math.min(worstRelation, change));
    });
}