import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {useEffect, useState} from "react";
import srdlist from "@/components/gameComponents/srdlist";
import {getMonsterProf, scoreToMod} from "@/5eReference/converters";
import MonsterSheet from "@/components/gameComponents/monstersheet";


const ConvertSRDMonsters = () => {
    const [SRDList, setSRDList] = useState([])
    const [convertedList, setConvertedList] = useState([])
    const [page, setPage] = useState("https://api.open5e.com/v1/monsters/?document__slug__iexact=wotc-srd&page=1")

    useEffect(() => {
        const parseMonster = async () => {
            for (const oldMonster of SRDList) {
                // await new Promise(r => setTimeout(r, 1000));
                console.log(oldMonster.name)
                if (oldMonster.name !== "Druid" && oldMonster.name !== "Dryad" && oldMonster.name !== "Djinni" && oldMonster.name !== "Roper" && oldMonster.name !== "Vampire" && oldMonster.name !== "Vampire Spawn") {
                    const newMonster = convertMonster(oldMonster)
                    setConvertedList((list) => [...list, newMonster])
                    console.log(newMonster)
                    // const savedMonster = createStatblock(newMonster)
                    // console.log(savedMonster)
                }
            }
        }

        const fetchData = async (url) => {
            const response = await fetch(url);
            const data = await response.json()
            console.log(data.results)
            setSRDList(SRDList.concat(data.results))
            setPage(data.next)
        }

        if (page) {
            fetchData(page)
        } else {
            parseMonster()
        }
    }, [page]);

    const convertMonster = (monster) => {
        const getSaveProficiencies = () => {
            const saves = []
            if (monster.strength_save) saves.push("strength")
            if (monster.dexterity_save) saves.push("dexterity")
            if (monster.constitution_save) saves.push("constitution")
            if (monster.intelligence_save) saves.push("intelligence")
            if (monster.wisdom_save) saves.push("wisdom")
            if (monster.charisma_save) saves.push("charisma")
            return saves
        }

        const getSkillProficiencies = () => {
            const skillError = (key) => console.error(`Ability mod for ${monster.name} ${key} does not line up with either proficiency or expertise`)

            const prof = getMonsterProf(monster.cr)
            const proficiencyList = {}
            Object.entries(monster.skills).forEach(([key, val]) => {
                console.log(key, val, scoreToMod(monster.intelligence), prof)
                if (key === "athletics") {
                    const strengthmod = Number(scoreToMod(monster.strength))
                    if (val === strengthmod + prof) {
                        proficiencyList[key] = "proficient"
                    } else if (val === strengthmod + (prof * 2)) {
                        proficiencyList[key] = "expertise"
                    } else {
                        skillError(key)
                    }
                }
                if (key === "acrobatics" || key === "sleight_of_hand" || key === "stealth") {
                    const dexteritymod = Number(scoreToMod(monster.dexterity))
                    if (val === dexteritymod + prof) {
                        proficiencyList[key] = "proficient"
                    } else if (val === dexteritymod + (prof * 2)) {
                        proficiencyList[key] = "expertise"
                    } else {
                        skillError(key)
                    }
                }
                if (key === "arcana" || key === "history" || key === "investigation" || key === "nature" || key === "religion") {
                    const intelligencemod = Number(scoreToMod(monster.intelligence))
                    if (val === intelligencemod + prof) {
                        proficiencyList[key] = "proficient"
                    } else if (val === intelligencemod + (prof * 2)) {
                        proficiencyList[key] = "expertise"
                    } else {
                        skillError(key)
                    }
                }
                if (key === "animal_handling" || key === "insight" || key === "medicine" || key === "perception" || key === "survival") {
                    const wisdommod = Number(scoreToMod(monster.wisdom))
                    if (val === wisdommod + prof) {
                        proficiencyList[key] = "proficient"
                    } else if (val === wisdommod + (prof * 2)) {
                        proficiencyList[key] = "expertise"
                    } else {
                        skillError(key)
                    }
                }
                if (key === "deception" || key === "intimidation" || key === "performance" || key === "persuasion") {
                    const charismamod = Number(scoreToMod(monster.charisma))
                    if (val === charismamod + prof) {
                        proficiencyList[key] = "proficient"
                    } else if (val === charismamod + (prof * 2)) {
                        proficiencyList[key] = "expertise"
                    } else {
                        skillError(key)
                    }
                }
            })
            return proficiencyList
        }

        const separateDamageString = (damageString) => {
            if (damageString === "") {
                return []
            }
            const colonArray = damageString.split("; ")
            if (colonArray.length > 1) {
                return colonArray[0].split(", ").concat(colonArray[1])
            } else {
                return colonArray[0].split(", ")
            }
        }

        function parseWeaponAttack(attackString, attackDamage, damageBonus) {
            const splitPattern = /(.*?)[.,]\s*(.*)/g
            const paranPattern = /\(([^)]+)\)/g
            const typePattern = /\)\s*([^ ]+)\s*damage/g
            console.log(attackString)
            const hitMatches = [...attackString.matchAll(splitPattern)];

            if (hitMatches.length === 0) {
                console.error(`No to hit matches in attack `, attackString)
                return null
            }
            console.log(hitMatches)
            const damages = hitMatches[0][1]
            const effect = hitMatches[0][2] ? hitMatches[0][2].trim() : ''

            if (!attackDamage && damageBonus) {
                console.log(`No attack damage, only a damage bonus for `, attackString)
                return {
                    damage: [{
                        damage_dice: `${damageBonus}`,
                        damage_type: damages.split(`Hit: ${damageBonus} `)[0].split(' damage')
                    }],
                    effect: effect
                }
            }

            if (!attackDamage && !damageBonus) {
                console.log(`No attack damage or damage bonus for `, attackString)
                return {
                    damage: [{
                        damage_dice: `0`,
                        damage_type: ''
                    }],
                    effect: effect
                }
            }


            if (!damages.split(')')[1]) {
                console.log(`No attack damage at all for`, attackString)
                return {
                    damage: [{
                        damage_dice: 0,
                        damage_type: ""
                    }],
                    effect: effect
                }
            }

            if (!attackDamage.includes('+')) {
                console.log(`Only one set of damage dice for `, attackString)

                const damage_dice = damageBonus ? `${attackDamage}+${damageBonus}` : `${attackDamage}`
                return {
                    damage: [{
                        damage_dice: damage_dice,
                        damage_type: damages.split(') ')[1].split(' damage')[0]
                    }],
                    effect: effect
                }
            }

            // console.log(damages)

            const diceMatches = damages.match(paranPattern)
            const typeMatches = damages.match(typePattern)
            const damage = []

            if (!diceMatches) {
                console.log(`Couldnt find a dice match, so falling pack on ${attackDamage} for `, attackString)
                return {
                    damage: [{damage_dice: attackDamage, damage_type: damages.split(' ')[1].split(' damage')}],
                    effect: effect
                }
            }

            for (let i = 0; i < diceMatches.length; i++) {
                if (typeMatches[i]) {
                    damage.push({
                        damage_dice: diceMatches[i].replace('(', '').replace(')', ''),
                        damage_type: typeMatches[i].replace(') ', '').replace(' damage', '')
                    })
                } else {
                    console.error("Multiple damage types for single damage dice: ", damages)
                    damage.push({
                        damage_dice: diceMatches[i].replace('(', '').replace(')', ''),
                        damage_type: 'lightning or thunder damage (djinni\'s choice).'
                    })
                }

            }

            console.log(`Returning completed damage for `, attackString)
            return {damage, effect};
        }


        const getActions = () => {
            if (monster.actions) {
                return monster.actions.map((action) => {
                    if (!action.desc.split(', ')[2]) {
                        console.log(`Attack for monster ${monster.name} is actually an ability: `, action)
                        return {name: action.name, desc: action.desc, type: "Ability"}
                    }
                    const newAction = {
                        name: action.name,
                        attack_bonus: action.attack_bonus,
                        desc: action.desc,
                        targets: action.desc.split(', ')[2].split(' Hit')[0],
                        type: action.desc.split(':')[0].trim()
                    }

                    if (newAction.type === "Melee Weapon Attack" || newAction.type === "Melee Spell Attack") {
                        newAction.reach = Number(action.desc.split("to hit, reach")[1].split(" ft.")[0])
                    } else if (newAction.type === "Ranged Spell Attack") {
                        newAction.short_range = Number(action.desc.split("to hit, range")[1].split(" ft.")[0])
                    } else if (newAction.type === "Ranged Weapon Attack") {
                        const range = action.desc.split("to hit, range")[1].split(" ft.")[0].split('/')
                        newAction.short_range = Number(range[0])
                        newAction.long_range = Number(range[1])
                    } else if (newAction.type === "Melee or Ranged Weapon Attack") {
                        console.log(newAction)
                        const totalrange = action.desc.split(", reach ")[1]
                        newAction.reach = Number(totalrange.split(' ft.'))
                        const rangedreach = totalrange.split('range ')[1].split(' ft.')[0].split('/')
                        newAction.short_range = Number(rangedreach[0])
                        newAction.long_range = Number(rangedreach[1])
                    } else {
                        console.log(`Attack for monster ${monster.name} is actually an ability: `, action)
                        return {name: action.name, desc: action.desc, type: "Ability"}
                    }

                    // k: +6 to hit, reach undefined ft. or ranged undefined/undefined ft., one target.. Hit:  4 (1d4+2) piercing damage.

                    console.log(action.desc)
                    // console.log(newAction.targets)
                    if (action.desc.split(newAction.targets).length > 1) {
                        const {
                            damage,
                            effect
                        } = parseWeaponAttack(action.desc.split(newAction.targets)[1], action.damage_dice, action.damage_bonus)
                        newAction.damage = damage
                        newAction.effect = effect
                        return newAction
                    } else {
                        console.error("Couldn't split by attack type for ", action, newAction.targets)
                    }
                })
            }
            return []
        }

        const getSpeed = () => {
            const speed = monster.speed
            Object.entries(monster.speed).forEach(([key, val]) => {
                if (key !== "walk" && key !== "swim" && key !== "swim" && key !== "fly" && key !== "climb" && key !== "burrow" && key !== "hover" && key !== "notes") {
                    console.error(`Speed ${key} for ${monster.name} is invalid`)

                }
            })
            return speed
        }


        const statblock = {
            ownerId: "wotc-srd",
            name: monster.name,
            desc: monster.desc,
            size: monster.size.toLowerCase(),
            type: monster.type.toLowerCase(),
            group: monster.group,
            alignment: monster.alignment,
            armor_class: monster.armor_class,
            armor_desc: monster.armor_desc,
            hit_points: monster.hit_points,
            hit_dice: monster.hit_dice,
            hit_dice_num: monster.hit_dice.split('d')[0],
            speed: getSpeed(),
            strength: monster.strength,
            dexterity: monster.dexterity,
            constitution: monster.constitution,
            intelligence: monster.intelligence,
            wisdom: monster.wisdom,
            charisma: monster.charisma,
            strength_save: monster.strength_save,
            dexterity_save: monster.dexterity_save,
            constitution_save: monster.constitution_save,
            intelligence_save: monster.intelligence_save,
            wisdom_save: monster.wisdom_save,
            charisma_save: monster.charisma_save,
            save_proficiencies: getSaveProficiencies(),
            perception: monster.perception,
            skills: monster.skills,
            skill_proficiencies: getSkillProficiencies(),
            damage_vulnerabilities: monster.damage_vulnerabilities,
            damage_vulnerability_list: separateDamageString(monster.damage_vulnerabilities),
            damage_resistances: monster.damage_resistances,
            damage_resistance_list: separateDamageString(monster.damage_resistances),
            damage_immunities: monster.damage_immunities,
            damage_immunity_list: separateDamageString(monster.damage_immunities),
            condition_immunities: monster.condition_immunities,
            condition_immunity_list: monster.condition_immunities ? monster.condition_immunities.split(", ") : [],
            senses: monster.senses,
            languages: monster.languages,
            challenge_rating: monster.challenge_rating,
            cr: monster.cr,
            special_abilities: monster.special_abilities ? monster.special_abilities.map((ability) => {
                return {name: ability.name, desc: ability.desc}
            }) : [],
            actions: getActions(),
            bonus_actions: monster.bonus_actions ? monster.bonus_actions.map((ability) => {
                return {name: ability.name, desc: ability.desc}
            }) : [],
            reactions: monster.reactions ? monster.reactions.map((ability) => {
                return {name: ability.name, desc: ability.desc}
            }) : [],
            legendary_desc: monster.legendary_desc,
            legendary_actions: monster.legendary_actions ? monster.legendary_actions.map((ability) => {
                return {name: ability.name, desc: ability.desc}
            }) : [],
            blindsight: 0,
            blindBeyond: false,
            darkvision: 0,
            tremorsense: 0,
            truesight: 0,
            mythic_desc: monster.mythic_desc,
            mythic_actions: monster.mythic_actions ? monster.mythic_actions.map((ability) => {
                return {name: ability.name, desc: ability.desc}
            }) : []

        }
        console.log(statblock)
        return statblock
    }

    const createStatblock = async (monster) => {
        const input = {...monster}
        // Call the createMap mutation
        const response = await API.graphql({
            query: mutations.createMonsterStatblock,
            variables: {input},
        });
        const savedMonster = response.data.createMonsterStatblock
        console.log(savedMonster)
        return savedMonster
    }

    console.log(convertedList)

    return (
        <div>
            <h1>
                Convert 5eSRD monsters
            </h1>
            <div>
                {convertedList.map((monster, i) => {
                    return <div key={monster.name + i}>
                        {monster ? <MonsterSheet statblock={monster}/> : null}
                        <br/>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ConvertSRDMonsters