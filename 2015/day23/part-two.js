import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const registers = { a: 1, b: 0 };
const instructions = input.split('\n');

for (let i = 0; i < instructions.length;) {
    const instruction = instructions[i];
    const [command, ...args] = instruction.split(/,? /);
    switch (command) {
        case 'hlf':
            registers[args[0]] /= 2;
            i++;
            break;
        case 'tpl':
            registers[args[0]] *= 3;
            i++;
            break;
        case 'inc':
            registers[args[0]]++;
            i++;
            break;
        case 'jmp':
            i += Number(args[0]);
            break;
        case 'jio':
            if (registers[args[0]] === 1) {
                i += Number(args[1]);
            } else {
                i++;
            }
            break;
        case 'jie':
            if (registers[args[0]] % 2 === 0) {
                i += Number(args[1]);
            } else {
                i++;
            }
            break;
    }
}
console.log(registers);
