import path from 'path';
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";
import { mineCoin } from "./mine-coin.js";

const dirPath = getDirPath(import.meta.url);
const secretKey = await readTextFile(path.resolve(dirPath, 'input.txt'));
const result = mineCoin(secretKey, 5);
console.log(result);
