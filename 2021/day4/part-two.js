import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const [rawNumbers, ...rawBoards] = input.split('\n\n');
const numbers = rawNumbers.split(',').map(Number);
const boards = rawBoards.map(board => {
    const rows = board.split('\n');
    return rows.map(row => {
        const rawRowNumbers = row.split(' ');
        return rawRowNumbers.map(Number);
    });
});

let sequences = boards.map(board => {
    const boardSequences = [];
    for (let i = 0; i < 5; i++) {
        boardSequences.push(board[i]);
        const vertical = []
        for (let j = 0; j < 5; j++) {
            vertical.push(board[j][i]);
        }
        boardSequences.push(vertical);
    }
    return boardSequences;
});

let losingNumber = null;

for (const number of numbers) {
    for (let i = 0; i < sequences.length; i++) {
        const boardSequences = sequences[i];
        for (let j = 0; j < boardSequences.length; j++) {
            const sequence = boardSequences[j];
            boardSequences[j] = sequence.filter(n => n !== number);
        }
    }
    const winners = sequences.filter(boardSequence => {
        return boardSequence.some(sequence => sequence.length === 0);
    });
    // last tie situation
    if (winners.length === sequences.length) {
        winners.forEach(w => {
            const winningSequence = w.find(s => !s.length);
            // we don't let tie sequence to qualify winner
            winningSequence.push(NaN);
        })
        continue;
    } else if (sequences.length > 1) {
        sequences = sequences.filter(boardSequence => {
            return boardSequence.every(s => s.length);
        });
    } else {
        losingNumber = number;
        break;
    }
}

const lastSequence = sequences[0];
const rows = lastSequence.filter((s, i) => i % 2 === 0);
let sum = 0;
rows.forEach(r => {
    r.forEach(v => sum += Number.isNaN(v) ? 0 : v);
});
console.log(sum * losingNumber);


