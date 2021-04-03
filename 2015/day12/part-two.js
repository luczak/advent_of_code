import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));

const parsed = JSON.parse(input);
let sum = 0;
sumObject(parsed);
console.log(sum);

function sumObject(object) {
    const values = Object.values(object);
    if (!Array.isArray(object) && values.includes("red")) { return; }
    values.forEach(v => {
        if (typeof v === "number") {
            sum += v;
        } else if (typeof v === "object") {
            sumObject(v);
        }
    });
}
