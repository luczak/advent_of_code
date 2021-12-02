import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const lines = input.split('\n');
const lights = lines.map(l => l.split(''));

for (let i = 0; i < 100; i++) {
    animate(lights);
}

console.log(lights.flat().filter(l => l === '#').length);

function animate(lights) {
    const snapshot = lights.map(row => [...row]);
    snapshot.forEach((row, i) => {
        row.forEach((light, j) => {
            if (['0/0' ,'0/99' ,'99/0', '99/99'].includes(`${i}/${j}`)) { return; }
            const neighbors = [];
            for (let i1 = i - 1; i1 < i + 2; i1++) {
                for (let j1 = j - 1; j1 < j + 2; j1++) {
                    if (i1 === i && j1 === j) { continue; }
                    if (snapshot[i1]?.[j1] !== undefined) {
                        neighbors.push(snapshot[i1][j1]);
                    }
                }
            }
            const litNeighbors = neighbors.filter(n => n === '#');
            if (light === '#') {
                if (![2, 3].includes(litNeighbors.length)) { lights[i][j] = '.'; }
            } else {
                if (litNeighbors.length === 3) { lights[i][j] = '#'; }
            }
        });
    });
}
