import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const targetInfo = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
}

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const rawAunts = input.split('\n');
let number = -1;

rawAunts.find((raw, index) => {
    number = index + 1;
    const trimmed = raw.replace(/^.+?: /, '');
    const properties = trimmed.split(', ');
    return properties.every(p => {
        const [key, value] = p.split(': ');
        if (['cats', 'trees'].includes(key)) {
            return Number(value) > targetInfo[key];
        } else if (['pomeranians', 'goldfish'].includes(key)) {
            return Number(value) < targetInfo[key];
        } else {
            return Number(value) === targetInfo[key];
        }
    });
});

console.log(number);