import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const details = input.split('\n');
const ingredients = details.map(ingredient => {
    const [capacity, durability, texture, flavor, calories] = ingredient.match(/-?\d+/g).map(Number);
    return { capacity, durability, texture, flavor, calories };
});

const quantities = new Array(ingredients.length).fill(0);
quantities[0] = 100;
const combinations = new Set();
let maxScore = -Infinity;

redistribute(quantities);
console.log(maxScore);

function redistribute(combination) {
    const string = JSON.stringify(combination);
    if (combinations.has(string) || combination.some(n => n < 0)) { return; }
    combinations.add(string);
    if (calculateCalories(combination) === 500) {
        maxScore = Math.max(maxScore, calculateScore(combination));
    }
    for (let i = 0; i < ingredients.length; i++) {
        const copy = [...combination];
        copy[0]--;
        copy[i]++;
        redistribute(copy);
    }
}

function calculateScore(quantities) {
    let capacity = 0, durability = 0, texture = 0, flavor = 0;
    ingredients.forEach((ingredient, index) => {
        capacity += ingredient.capacity * quantities[index];
        durability += ingredient.durability * quantities[index];
        texture += ingredient.texture * quantities[index];
        flavor += ingredient.flavor * quantities[index];
    });
    return Math.max(capacity, 0) * Math.max(durability, 0) * Math.max(texture, 0) * Math.max(flavor, 0);
}

function calculateCalories(quantities) {
    return ingredients.reduce((sum, { calories }, i) => sum + calories * quantities[i], 0);
}