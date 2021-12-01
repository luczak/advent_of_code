import { fileURLToPath } from "url";
import { dirname } from "path";

export function getDirPath(fileUrl) {
    const filePath = fileURLToPath(fileUrl);
    return dirname(filePath);
}