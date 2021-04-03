import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const RACE_DURATION = 2503;

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('\n');
const reindeer = instructions.map(instruction => {
    const [speed, duration, rest] = instruction.match(/\d+/g).map(Number);
    return {
        speed,
        duration,
        rest,
        flying: true,
        timeLeft: duration,
        score: 0,
        position: 0,
    };
})

for (let i = 0; i < RACE_DURATION; i++) {
    let maxPosition = -Infinity;
    reindeer.forEach(r => {
        r.timeLeft--;
        if (r.flying) { r.position += r.speed; }
        maxPosition = Math.max(maxPosition, r.position);
        if (r.timeLeft === 0) {
            r.flying = !r.flying;
            r.timeLeft = r.flying ? r.duration : r.rest;
        }
    });
    const leaders = reindeer.filter(r => r.position === maxPosition);
    leaders.forEach(l => l.score++);
}

const scores = reindeer.map(r => r.score);
console.log(Math.max(...scores));