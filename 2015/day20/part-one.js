import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";
import path from "path";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
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

