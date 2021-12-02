import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const instructions = input.split('\n');

let x = 0;
let y = 0;

instructions.forEach(instruction => {
    const [,direction, rawDistance] = instruction.match(/(\w+) (\d+)/);
    const distance = Number(rawDistance);
    if (direction === 'forward') {
        x += distance;
    } else if (direction === 'down') {
        y += distance;
    } else {
        y -= distance;
    }
});

console.log(x * y);