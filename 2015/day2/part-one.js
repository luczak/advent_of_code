import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const boxes = input.split('\n');

let total = 0;
boxes.forEach(b => {
    const [width, height, length] = b.split('x').map(Number);
    const side1 = width * height;
    total += 2 * side1;
    const side2 = width * length;
    total += 2 * side2;
    const side3 = height * length;
    total += 2 * side3;
    total += Math.min(side1, side2, side3);
});
console.log(total);