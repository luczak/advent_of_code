import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const readings = input.split('\n');

let rawGamma = '';

for (let i = 0; i < readings[0].length; i++) {
    let ones = 0;
    for (const reading of readings) {
        if (reading[i] === '1') {
            ones++;
        }
    }
    rawGamma += ones >= readings.length / 2 ? 1 : 0;
}

const gamma = parseInt(rawGamma, 2);
const rawEpsilon = rawGamma
    .split('')
    .map(bit => 1 - bit)
    .join('');
const epsilon = parseInt(rawEpsilon, 2);

console.log(gamma * epsilon);
