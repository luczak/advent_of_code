import path from "path";
import { getDirPath } from "../get-dir-path.js";
import { readTextFile } from "../read-text-file.js";

const spells = [
    { cost: 53, dmg: 4, name: 'missile' },
    { cost: 73, dmg: 2, heal: 2, name: 'drain' },
    { cost: 113, armor: 7, duration: 6, name: 'armor' },
    { cost: 173, dmg: 3, duration: 6, name: 'poison' },
    { cost: 229, duration: 5, mana: 101, name: 'recharge' },
]
const basePlayer = { mana: 500, hp: 50, armor: 0, manaUsed: 0, effects: [] };

const dirPath = getDirPath(import.meta.url);
const input = await readTextFile(path.resolve(dirPath, 'input.txt'));
const [hp, dmg] = input.match(/\d+/g).map(Number);
const baseBoss = { hp, dmg };
let minMana = Infinity;

spells.forEach(s => cast(s));
console.log(minMana);

function cast(spell, player = { ...basePlayer }, boss = { ...baseBoss }, casted = [spell.name]) {
    // hard diff
    player.hp--;
    if (player.hp <= 0) { return; }

    // passive effects player
    player.effects = player.effects.filter(e => apply(e, player, boss));
    if (boss.hp <= 0) {
        return minMana = player.manaUsed;
    }

    // player cast
    player.manaUsed += spell.cost;
    player.mana -= spell.cost;
    if (player.mana <= 0 || player.manaUsed >= minMana) { return; }

    // cast effect
    if (spell.duration) {
        player.effects.push({ ...spell });
    } else if (spell.dmg) {
        boss.hp -= spell.dmg
        if (spell.heal) { player.hp += spell.heal; }
    }
    if (boss.hp <= 0) {
        return minMana = player.manaUsed;
    }

    // passive effect boss
    player.armor = 0;
    player.effects = player.effects.filter(e => apply(e, player, boss));
    if (boss.hp <= 0) {
        return minMana = player.manaUsed;
    }

    // boss attack
    player.hp -= Math.max(boss.dmg - player.armor, 1);
    if (player.hp <= 0) { return; }

    // next action
    const castable = spells.filter(s => !player.effects.filter(e => e.duration > 1).map(e => e.name).includes(s.name));
    castable.forEach(s => {
        cast(s, { ...player, effects: player.effects.map(e => ({ ...e })) }, { ...boss }, [...casted, s.name]);
    });
}

function apply(effect, player, boss) {
    effect.duration--;
    if (effect.dmg) {
        boss.hp -= effect.dmg;
    } else if (effect.mana) {
        player.mana += effect.mana
    } else {
        player.armor = effect.armor;
    }
    return effect.duration;
}
