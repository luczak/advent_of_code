import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');

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
