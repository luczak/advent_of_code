import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const stripped = input.replace(/(^"|"$)/gm, '');
const unescaped = stripped.replace(/(\\\\|\\x..|\\")/g, 'a');
console.log(input.length - unescaped.length);