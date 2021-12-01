import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const RACE_DURATION = 2503;

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const reindeer = input.split('\n');

const distances = reindeer.map(r => {
    const [speed, duration, rest] = r.match(/\d+/g).map(Number);
    let timeLeft = RACE_DURATION;
    let traveled = 0;
    while (timeLeft > 0) {
        const travelTime = Math.min(duration, timeLeft);
        timeLeft -= travelTime;
        traveled += travelTime * speed;
        const restTime = Math.min(rest, timeLeft);
        timeLeft -= restTime;
    }
    return traveled;
});

console.log(Math.max(...distances));