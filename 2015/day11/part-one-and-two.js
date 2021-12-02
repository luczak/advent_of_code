import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');

const password1 = generateNextPassword(input);
console.log(password1);
const password2 = generateNextPassword(password1);
console.log(password2);

function generateNextPassword(current) {
    let next = current
    do {
        next = incrementPassword(next);
    } while (!isValidPassword(next));
    return next;
}

function incrementPassword(password) {
    const passwordLetters = password.split('');
    let position = password.length - 1;
    while (passwordLetters[position] === 'z') {
        passwordLetters[position] = 'a';
        position--;
    }
    passwordLetters[position] = String.fromCharCode(password.charCodeAt(position) + 1);
    return passwordLetters.join('');
}

function isValidPassword(string) {
    return hasIncreasingSequence(string) && hasUnambiguousCharacters(string) && hasPairs(string);
}

function hasIncreasingSequence(string) {
    for (let i = 0; i < string.length - 2; i++) {
        let isSequence = true;
        const baseCharCode = string.charCodeAt(i);
        for (let j = 1; j < 3; j++) {
            if (baseCharCode + j !== string.charCodeAt(i + j)) {
                isSequence = false;
            }
        }
        if (isSequence) { return true; }
    }
    return false;
}

function hasUnambiguousCharacters(string) {
    return !/[iou]/.test(string);
}

function hasPairs(string) {
    return string.match(/(.)\1/g)?.length === 2;
}