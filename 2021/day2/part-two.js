import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const instructions = input.split('\n');

let aim = 0;
let x = 0;
let y = 0;

instructions.forEach(instruction => {
    const [direction, rawDistance] = instruction.split(' ');
    const distance = Number(rawDistance);
    if (direction === 'forward') {
        x += distance;
        y += distance * aim;
    } else if (direction === 'down') {
        aim += distance;
    } else {
        aim -= distance;
    }
});

console.log(x * y);
