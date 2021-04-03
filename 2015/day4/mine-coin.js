import crypto from "crypto";

export function mineCoin(secretKey, difficulty) {
    const solution = '0'.repeat(difficulty);
    let hashed = '';
    let salt = -1;
    do {
        salt++;
        const input = secretKey + salt;
        const hash = crypto.createHash('md5');
        hash.update(input);
        hashed = hash.digest('hex');
    } while (!hashed.startsWith(solution));
    return salt;
}