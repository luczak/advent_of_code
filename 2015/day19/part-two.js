import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
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
    if (step > minSteps || results.has(current)) {
        return;
    }
    results.add(current);
    if (current === 'e') {
        minSteps = Math.min(step, minSteps)
        return;
    }
    for (const [k, v] of transformations) {
        const replaced = current.replace(k, v);
        minLength = Math.min(replaced.length, minLength);
        if (replaced.length > minLength) { continue; }
        transform(current.replace(k, v), step + 1);
    }
}
