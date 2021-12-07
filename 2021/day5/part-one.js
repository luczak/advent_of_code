import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const rawLines = input.split('\n');
const lines = rawLines.map(l => {
    const rawPoints = l.split(' -> ');
    return rawPoints.map(p => p.split(',').map(Number));
});

const grid = new Array(1000);
for (let i = 0; i < 1000; i ++) {
    grid[i] = [];
}

const straightLines = lines.filter(l => {
    return l[0][0] === l[1][0] || l[0][1] === l[1][1];
});

let counter = 0;

for (const line of straightLines) {
    const [[x1, y1], [x2, y2]] = line;
    const vertical = x1 === x2;
    if (vertical) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        for (let y = start; y <= end; y++) {
            const value = grid[x1][y] || 0;
            grid[x1][y] = value + 1;
            if (grid[x1][y] === 2) {
                counter++
            }
        }
    } else {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        for (let x = start; x <= end; x++) {
            const value = grid[x][y1] || 0;
            grid[x][y1] = value + 1;
            if (grid[x][y1] === 2) {
                counter++;
            }
        }
    }
}

console.log(counter);
