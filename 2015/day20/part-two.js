import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const presentsCount = Number(input);
const simpleCount = presentsCount;
let houseNumber = 0;
let housePresents = 0;

while (housePresents < simpleCount) {
    houseNumber++;
    housePresents = 0;
    for (let i = 1; i <= Math.sqrt(houseNumber); i++) {
        if (houseNumber % i === 0) {
            if (houseNumber / i <= 50) {
                housePresents += i * 11;
            }
            const result = houseNumber / i;
            if (result !== i && i < 50) {
                housePresents += result * 11;
            }
        }
    }
}
