import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const routes = input.split('\n');
const connections = new Map();
routes.forEach(route => {
    const [start, remainder] = route.split(' to ');
    const [end, distance] = remainder.split(' = ');
    if (!connections.has(start)) { connections.set(start, new Map()); }
    if (!connections.has(end)) { connections.set(end, new Map()); }
    connections.get(start).set(end, Number(distance));
    connections.get(end).set(start, Number(distance));
});
let longest = -Infinity;
const cities = Array.from(connections.keys());
cities.forEach(city => traverse(city));
function traverse(city, visited = [], total = 0) {
    if (visited.includes(city)) { return; }
    visited.push(city);
    if (visited.length === cities.length && total > longest) { return longest = total; }
    connections.get(city).forEach((distance, destination) => {
        traverse(destination, Array.from(visited), total + distance);
    });
}
console.log(longest);
