import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const depths = input.split('\n').map(Number);

let counter = 0;
let prev = null;

for (let i = 0; i < depths.length - 2; i++) {
    const window = depths.slice(i, i + 3);
    const sum = window.reduce((sum, depth) => sum + depth, 0);
    if (prev && sum > prev) {
        counter++;
    }
    prev = sum;
}

console.log(counter);
