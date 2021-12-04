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

const sequences = boards.map(board => {
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

let winningNumber = null;
let winningBoardIndex = null;

for (const number of numbers) {
    for (let i = 0; i < sequences.length && winningNumber === null; i++) {
        const boardSequences = sequences[i];
        for (let j = 0; j < boardSequences.length; j++) {
            let sequence = boardSequences[j];
            boardSequences[j] = sequence.filter(n => n !== number);
        }
        if (boardSequences.some(s => !s.length)) {
            winningNumber = number;
            winningBoardIndex = i;
        }
    }
}

const winningBoard = sequences[winningBoardIndex];
let result = 0;
for (let i = 0; i < winningBoard.length; i += 2) {
    result += winningBoard[i].reduce((sum, n) => sum + n, 0);
}

console.log(result * winningNumber);

