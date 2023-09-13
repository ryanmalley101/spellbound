const scoreToMod = (score) => {
    const mod = Math.floor((Number(score) - 10) / 2)
    if (mod < 0) {
        return mod.toString()
    } else {
        return '+' + mod.toString()
    }
}

const getMonsterProf = (cr) => {
    return Math.max(Math.floor(Number(cr) - 1) / 4, 0) + 2
}

const crToXP = (cr) => {
    const CR_TO_XP_TABLE = {
        0: 0,
        .125: 25,
        .25: 50,
        .5: 100,
        1: 200,
        2: 450,
        3: 700,
        4: 1100,
        5: 1800,
        6: 2300,
        7: 2900,
        8: 3900,
        9: 5000,
        10: 5900,
        11: 7200,
        12: 8400,
        13: 10000,
        14: 11500,
        15: 13000,
        16: 15000,
        17: 18000,
        18: 20000,
        19: 22000,
        20: 25000,
        21: 33000,
        22: 41000,
        23: 50000,
        24: 62000,
        25: 76000,
        26: 90000,
        27: 105000,
        28: 120000,
        29: 137000,
        30: 155000
    }

    return CR_TO_XP_TABLE[cr.toString()]
}


export {crToXP, scoreToMod, getMonsterProf}