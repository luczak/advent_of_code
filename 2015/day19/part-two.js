import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const [rawTransformations, molecule] = input.split('\n\n');
const stringTransformations = rawTransformations.split('\n');
const transformations = stringTransformations.map(transformation => {
    const [start, end] = transformation.split(' => ');
    return [end, start];
});

const results = new Set();
let minSteps = Infinity;
let minLength = Infinity;
transform(molecule);
console.log(minSteps);

function transform(current, step = 0) {
    minLength = Math.min(current.length, minLength);
    if (step > minSteps || current.length > minLength || results.has(current)) {
        return;
    }
    results.add(current);
    if (current === 'e') {
        minSteps = Math.min(step, minSteps)
        return;
    }
    for (const [k, v] of transformations) {
        transform(current.replace(k, v), step + 1);
    }
}
