import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const strings = input.split('\n');
const niceStrings = strings.filter(word =>
    word.match(/[aeiou]/g)?.length >= 3 &&
    /(.)\1/.test(word) &&
    !/(ab|cd|pq|xy)/.test(word)
);

console.log(niceStrings.length)