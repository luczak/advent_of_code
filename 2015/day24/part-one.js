import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const numbers = input.split('\n').map(Number);
numbers.reverse();
const sum = numbers.reduce((sum, n) => sum + n, 0);
const groupWeight = sum / 3;

const set = new Set();
let minLength = Infinity;
let minQE = Infinity;

distribute();
console.log(minQE);

function distribute(container = [], remaining = [...numbers]) {
    const string = container.sort((a, b) => a - b).toString();
    if (set.has(string)) { return; }
    set.add(string);

    if (container.length > minLength) { return; }

    const weight = container.reduce((sum, n) => sum + n, 0);
    if (weight > groupWeight) { return; }

    if (weight === groupWeight) {
        minLength = container.length;
        const qe = container.reduce((product, n) => product * n, 1);
        if (qe < minQE) { minQE = qe; }
        return;
    }
    for (let i = 0; i < remaining.length; i++) {
        const newContainer = [...container, remaining[i]];
        const newRemaining = [...remaining];
        newRemaining.splice(i, 1);
        distribute(newContainer, newRemaining);
    }
}