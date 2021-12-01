import path from "path";
import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";

const dirName = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirName, 'input.txt'));
const stripped = input.replace(/(^"|"$)/gm, '');
const unescaped = stripped.replace(/(\\\\|\\x..|\\")/g, 'a');
console.log(input.length - unescaped.length);