import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";
import path from "path";

const dirName = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirName, 'input.txt'));
const escapedSlashes = input.replace(/\\/g, '\\\\');
const escapedQuotes = escapedSlashes.replace(/"/g, '\\"');
const quoted = escapedQuotes.replace(/(^.|.$)/gm, '"$&');
console.log(quoted.length - input.length);
