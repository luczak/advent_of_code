import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const depths = input.split('\n').map(Number);
let counter = 0;

for (let i = 1; i < depths.length; i++) {
    const prev = depths[i - 1];
    const current = depths[i];
    if (current > prev) {
        counter++;
    }
}

console.log(counter);
