import { getDirPath } from "../../common/get-dir-path.js";
import { readTextFile } from "../../common/read-text-file.js";
import * as path from "path";

const itemShop = {
    weapons: [
        { cost: 8, dmg: 4 },
        { cost: 10, dmg: 5 },
        { cost: 25, dmg: 6 },
        { cost: 40, dmg: 7 },
        { cost: 74, dmg: 8 },
    ],
    armors: [
        { cost: 0, def: 0 },
        { cost: 13, def: 1 },
        { cost: 31, def: 2 },
        { cost: 53, def: 3 },
        { cost: 75, def: 4 },
        { cost: 102, def: 5 },
    ],
    rings: [
        { cost: 0, dmg: 0 },
        { cost: 25, dmg: 1 },
        { cost: 50, dmg: 2 },
        { cost: 100, dmg: 3 },
        { cost: 0, def: 0 },
        { cost: 20, def: 1 },
        { cost: 40, def: 2 },
        { cost: 80, def: 3 },
    ],
}
const basePlayer = { hp: 100, dmg: 0, def: 0 };

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const [hp, dmg, def] = input.match(/\d+/g).map(Number);
const enemy = { hp, dmg, def };
let minSpending = Infinity;

for (const weapon of itemShop.weapons) {
    for (const armor of itemShop.armors) {
        for (const ring1 of itemShop.rings) {
            for (const ring2 of itemShop.rings) {
                if (ring2  === ring1) { continue; }
                const hero = { ...basePlayer };
                let total = equip(hero, weapon);
                total += equip(hero, armor);
                total += equip(hero, ring1);
                total += equip(hero, ring2);
                if (isWinning(hero, enemy) && total < minSpending) {
                    minSpending = total;
                }
            }
        }
    }
}

console.log(minSpending);

function equip(hero, item) {
    hero.dmg += item.dmg || 0;
    hero.def += item.def || 0;
    return item.cost;
}

function isWinning(player, enemy) {
    const playerTurns = turnsToWin(player.dmg, enemy.def, enemy.hp);
    const enemyTurns = turnsToWin(enemy.dmg, player.def, player.hp);
    return playerTurns <= enemyTurns;
}
function turnsToWin(dmg, enemyDef, enemyHP) {
    return Math.ceil(enemyHP / Math.max(dmg - enemyDef, 1));
}