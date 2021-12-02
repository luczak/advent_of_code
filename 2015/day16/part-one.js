import { readInput } from "../../common/read-input.js";

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

const input = await readInput(import.meta.url, './input.txt');
const rawAunts = input.split('\n');
let number = -1;

rawAunts.find((raw, index) => {
    number = index + 1;
    const trimmed = raw.replace(/^.+?: /, '');
    const properties = trimmed.split(', ');
    return properties.every(p => {
        const [key, value] = p.split(': ');
        return Number(value) === targetInfo[key];
    });
});

console.log(number);