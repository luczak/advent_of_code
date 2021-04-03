import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";
import path from "path";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('\n');
const symbolFormulas = new Map();

instructions.forEach(instruction =>  {
    const [formula, symbol] = instruction.split(' -> ');
    symbolFormulas.set(symbol, formula.split(' '));
});
let done = false;

while (!done) {
    for (const [symbol, formula] of symbolFormulas.entries()) {
        let number;
        if (formula.length === 1 && !isNaN(formula[0])) {
            number = Number(formula[0]);
        } else if (formula.includes('NOT') && !isNaN(formula[1])) {
            number = ~Number(formula[1]);
        } else if (formula.includes('RSHIFT') && !isNaN(formula[0])) {
            number = Number(formula[0]) >> Number(formula[2]);
        } else if (formula.includes('LSHIFT') && !isNaN(formula[0])) {
            number = Number(formula[0]) << Number(formula[2]);
        } else if (formula.includes('AND') && !isNaN(formula[0]) && !isNaN(formula[2])) {
            number = Number(formula[0]) & Number(formula[2]);
        } else if (formula.includes('OR') && !isNaN(formula[0]) && !isNaN(formula[2])) {
            number = Number(formula[0]) | Number(formula[2]);
        }
        if (number && symbol === 'a') {
            console.log(number);
            done = true;
            break;
        }
        if (number !== undefined) { replaceSymbolWithValue(symbol, number); }
    }
}

function replaceSymbolWithValue(symbol, value) {
    symbolFormulas.delete((symbol));
    for (const formula of symbolFormulas.values()) {
        formula.forEach((component, index) => {
            if (component === symbol) { formula[index] = value; }
        });
    }
}
