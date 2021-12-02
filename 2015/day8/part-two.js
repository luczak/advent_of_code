import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const escapedSlashes = input.replace(/\\/g, '\\\\');
const escapedQuotes = escapedSlashes.replace(/"/g, '\\"');
const quoted = escapedQuotes.replace(/(^.|.$)/gm, '"$&');
console.log(quoted.length - input.length);
