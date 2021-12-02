import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const instructions = input.split('');

for (let floorNumber = 0, i = 0; i < instructions.length; i++) {
    const char = instructions[i];
    floorNumber += char === '(' ? 1 : -1;
    if (floorNumber < 0) {
        console.log(i + 1);
        break;
    }
}