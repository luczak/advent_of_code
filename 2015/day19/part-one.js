import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const [rawTransformations, molecule] = input.split('\n\n');
const transformationsMap = new Map();
const transformations = rawTransformations.split('\n');
transformations.forEach(transformation => {
    const [start, end] = transformation.split(' => ');
    if (!transformationsMap.has(start)) { transformationsMap.set(start, []); }
    transformationsMap.get(start).push(end);
});
const lengths = [...transformationsMap.keys()].map(k => k.length);
const maxLength = Math.max(...lengths);
const uniqueMolecules = new Set();

for (let i = 0; i < molecule.length; i++) {
    let current = '';
    for (let j = 0; j < maxLength; j++) {
        current += molecule[i + j];
        const possibleTransformations = transformationsMap.get(current);
        if (!possibleTransformations) { continue; }
        possibleTransformations.forEach(t => {
            const result = molecule.slice(0, i) + t + molecule.slice(i + j + 1);
            uniqueMolecules.add(result);
        });
    }
}

console.log(uniqueMolecules.size);
