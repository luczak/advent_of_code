import { readInput } from "../../common/read-input.js";

const input = await readInput(import.meta.url, './input.txt');
const readings = input.split('\n');

function findReading(mostCommon = true) {
    let validReadings = [...readings];
    for (let i = 0; i < validReadings[0].length; i++) {
        let ones = 0;
        for (const reading of validReadings) {
            if (reading[i] === '1') {
                ones++;
            }
        }
        const mostCommonValue = ones >= validReadings.length / 2 ? '1' : '0';
        validReadings = validReadings.filter(r =>
            mostCommon ?
                r[i] === mostCommonValue :
                r[i] !== mostCommonValue
        );
        if (validReadings.length === 1) {
            return validReadings[0];
        }
    }
}

const rawOxygen = findReading();
const oxygen = parseInt(rawOxygen, 2);
const rawCo2 = findReading(false);
const co2  = parseInt(rawCo2, 2);
console.log(oxygen * co2);