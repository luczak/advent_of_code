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

let counter = 0;

for (const line of lines) {
    const [[x1, y1], [x2, y2]] = line;
    const vertical = x1 === x2;
    const horizontal = y1 === y2;
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
    } else if (horizontal) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        for (let x = start; x <= end; x++) {
            const value = grid[x][y1] || 0;
            grid[x][y1] = value + 1;
            if (grid[x][y1] === 2) {
                counter++;
            }
        }
    } else {
        const startX = Math.min(x1, x2);
        const endX = Math.max(x1, x2);
        const [startY, endY] = startX === x1 ? [y1, y2] : [y2, y1];
        const yOperation = startY < endY ? x => x+1 : x => x-1;
        let y = startY;
        for (let x = startX; x <= endX; x++) {
            const value = grid[x][y] || 0;
            grid[x][y] = value + 1;
            if (grid[x][y] === 2) {
                counter++;
            }
            y = yOperation(y);
        }
    }
}

console.log(counter);