import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const instructions = input.split('');

const floor = instructions.reduce((sum, char) => char === '(' ? ++sum : --sum, 0);
console.log(floor);