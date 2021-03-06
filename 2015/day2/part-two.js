import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const boxes = input.split('\n');

let total = 0;
boxes.forEach(b => {
    const edges = b.split('x').map(Number);
    total += edges.reduce((product, e) => product * e, 1);

    const longestEdge = Math.max(...edges);
    const index = edges.indexOf(longestEdge);
    edges.splice(index, 1);
    total += edges.reduce((product, e) => product + 2 * e, 0);
});
console.log(total);