import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const strings = input.split('\n');
const niceStrings = strings.filter(word =>
    /(.{2}).*?\1/.test(word) &&
    /(.).\1/.test(word)
);

console.log(niceStrings.length)
