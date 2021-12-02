import { readInput } from "../../common/read-input.js";
import { mineCoin } from "./mine-coin.js";

const secretKey = await readInput(import.meta.url, './input.txt');
const result = mineCoin(secretKey, 6);
console.log(result);
