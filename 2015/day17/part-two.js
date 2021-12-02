import { readInput } from "../../common/read-input.js";

const TOTAL = 150;

const input = await readInput(import.meta.url, './input.txt');
const containers = input.split('\n').map(Number);

const combinations = new Set();
let options = 0;
let minContainers = Infinity;

for (const containerId in containers) {
    distribute(containerId);
}

function distribute(containerId, filled = [], left = TOTAL) {
    filled.push(containerId);
    if (filled.length > minContainers) { return; }
    left -= containers[containerId];
    const string = JSON.stringify(filled.sort((a,b) => a - b));
    if (combinations.has(string) || left < 0) { return; }
    combinations.add(string);
    if (left === 0) {
        if (filled.length < minContainers) {
            minContainers = filled.length;
            options = 1;
        } else {
            options++;
        }
        return;
    }
    for (let id in containers) {
        if (filled.includes(id)) { continue; }
        distribute(id, [...filled], left);
    }
}
console.log(options);
