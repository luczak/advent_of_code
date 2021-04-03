import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const instructions = input.split('');

const floor = instructions.reduce((sum, char) => char === '(' ? ++sum : --sum, 0);
console.log(floor);