import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
generateSequence(50, input);

function generateSequence(times, sequence) {
    for (let i = 0; i < times; i++) {
        const newInput = [];
        let previous = sequence[0];
        let counter = 0;
        Array.from(sequence).forEach(digit => {
            if (digit === previous) {
                counter++;
            } else {
                newInput.push(String(counter), previous);
                previous = digit
                counter = 1;
            }
        });
        newInput.push(String(counter), sequence[sequence.length - 1]);
        sequence = newInput.join('');
    }
    console.log(sequence.length);
}

