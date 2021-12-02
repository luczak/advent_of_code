import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const presentsCount = Number(input);
const simpleCount = presentsCount / 10;
let houseNumber = 0;
let housePresents = 0;

while (housePresents < simpleCount) {
    houseNumber++;
    housePresents = 0;
    for (let i = 1; i <= Math.sqrt(houseNumber); i++) {
        if (houseNumber % i === 0) {
            housePresents += i;
            const result = houseNumber / i;
            if (result !== i) { housePresents += result; }
        }
    }
}

console.log(houseNumber);

