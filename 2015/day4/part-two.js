import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";
import path from "path";
import { mineCoin } from "./mine-coin.js";

const dirPath = getDirPath(import.meta.url);
const secretKey = await readTextFile(path.resolve(dirPath, 'input.txt'));
const result = mineCoin(secretKey, 6);
console.log(result);
