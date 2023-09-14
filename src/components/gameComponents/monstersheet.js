import React, {useEffect, useState} from "react";
import styles from "@/styles/MonsterSheet.module.css"
import {crToXP, scoreToMod, getMonsterProf} from "@/5eReference/converters";
import {DiceRoll, DiceRoller} from "@dice-roller/rpg-dice-roller";
import {rollCheck, rollAttack} from "@/messageUtilities/mailroom";

export const plusMinus = (save) => {
    if (Number(save) >= 0) {
        return (`+${save.toString()}`)
    } else {
        return `${save.toString()}`
    }
}

export const descAttack = (monsterData, attack) => {
    const getRange = () => {
        switch (attack.type) {
            case "Melee Weapon Attack":
                return `reach ${attack.reach} ft.`
            case "Melee Spell Attack":
                return `reach ${attack.reach} ft.`
            case "Ranged Weapon Attack":
                return `ranged ${attack.short_range}/${attack.long_range} ft.`
            case "Ranged Spell Attack":
                return `ranged ${attack.short_range} ft.`
            case "Melee or Ranged Weapon Attack":
                return `reach ${attack.reach} ft. or ranged ${attack.short_range}/${attack.long_range} ft.`
            default:
                console.error(`Invalid type for action ${attack}`)
                return null
        }
    }

    const getToHit = () => {
        console.log(attack)
        const bracket_pattern = /\[(.*?)\]/
        const match = attack.attack_bonus.toString().match(bracket_pattern)

        if (match) {
            const values = match[1].split(/\s+/)
            const hit_bonus = 0
            return plusMinus(values.reduce((accumulator, currentValue) => {
                switch (currentValue) {
                    case "STR":
                        return accumulator + Number(scoreToMod(monsterData.strength))
                    case "DEX":
                        return accumulator + Number(scoreToMod(monsterData.dexterity))
                    case "CON":
                        return accumulator + Number(scoreToMod(monsterData.constitution))
                    case "INT":
                        return accumulator + Number(scoreToMod(monsterData.intelligence))
                    case "WIS":
                        return accumulator + Number(scoreToMod(monsterData.wisdom))
                    case "CHA":
                        return accumulator + Number(scoreToMod(monsterData.charisma))
                    case "ATK":
                        return accumulator + getMonsterProf(monsterData.cr)
                    default:
                        console.error("Invalid to hit identifier ")
                }
            }, hit_bonus))
        }

        return plusMinus(attack.attack_bonus)
    }

    const getDamage = () => {
        const damage = [...attack.damage]
        const initialText = ''
        const roller = new DiceRoller()
        const damageString = damage.reduce((accumulator, currentValue) => {
            console.log(currentValue)
            if (currentValue.damage_dice !== 0) {
                const diceRoll = roller.roll(currentValue.damage_dice)
                accumulator += `${Math.floor(diceRoll.averageTotal)} (${currentValue.damage_dice}) ${currentValue.damage_type} damage plus `
            }
            return accumulator
        }, initialText)
        return damageString.slice(0, -6)
    }

    return <>
        <em><strong>{attack.name}.&nbsp;</strong>{attack.type}:&nbsp;</em>
        {getToHit()} to hit, {getRange()}, {attack.targets}.&nbsp;<em>Hit:&nbsp;</em> {getDamage()}. {attack.effect}</>
}

const MonsterSheet = ({slug, statblock, printRef, rollable, playerId, gameId}) => {
    const [monsterData, setMonsterData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            console.log(slug)
            const response = await fetch(`https://api.open5e.com/v1/monsters/?slug__in=&slug__iexact=${slug}`);
            const data = await response.json()
            console.log(data.results[0])

            // Validate the API response against the schema
            // const isValid = validate(data, Monster);
            const isValid = true
            if (isValid) {
                setMonsterData(data.results[0]);
            }
        }

        if (statblock) {
            setMonsterData(statblock)
        } else {
            fetchData();
        }
    }, [slug, statblock]);

    const getSpeed = () => {
        if (!monsterData.speed) {
            return null
        }
        let speedString = ""
        for (const [key, value] of Object.entries(monsterData.speed)) {
            if (key === "walk") {
                speedString = speedString.concat(value.toString(), ' ft., ')
            } else if (value) {
                speedString = speedString.concat(key, " ", value.toString(), ' ft., ')
            }
        }
        speedString = speedString.substring(0, speedString.length - 2)
        return speedString
    }

    const getAbilityScores = () => {

        if (rollable) {
            return (
                <table className={styles.attributes}>
                    <tbody>
                    <tr>
                        <th>STR</th>
                        <th>DEX</th>
                        <th>CON</th>
                        <th>INT</th>
                        <th>WIS</th>
                        <th>CHA</th>
                    </tr>
                    <tr>
                        <td>{monsterData.strength} ({scoreToMod(monsterData.strength)})</td>
                        <td>{monsterData.dexterity} ({scoreToMod(monsterData.dexterity)})</td>
                        <td>{monsterData.constitution} ({scoreToMod(monsterData.constitution)})</td>
                        <td>{monsterData.intelligence} ({scoreToMod(monsterData.intelligence)})</td>
                        <td>{monsterData.wisdom} ({scoreToMod(monsterData.wisdom)})</td>
                        <td>{monsterData.charisma} ({scoreToMod(monsterData.charisma)})</td>
                    </tr>
                    </tbody>
                </table>
            )
        }

        return (
            <table className={styles.attributes}>
                <tbody>
                <tr>
                    <th>STR</th>
                    <th>DEX</th>
                    <th>CON</th>
                    <th>INT</th>
                    <th>WIS</th>
                    <th>CHA</th>
                </tr>
                <tr>
                    <td>{monsterData.strength} ({scoreToMod(monsterData.strength)})</td>
                    <td>{monsterData.dexterity} ({scoreToMod(monsterData.dexterity)})</td>
                    <td>{monsterData.constitution} ({scoreToMod(monsterData.constitution)})</td>
                    <td>{monsterData.intelligence} ({scoreToMod(monsterData.intelligence)})</td>
                    <td>{monsterData.wisdom} ({scoreToMod(monsterData.wisdom)})</td>
                    <td>{monsterData.charisma} ({scoreToMod(monsterData.charisma)})</td>
                </tr>
                </tbody>
            </table>
        )
    }

    const getSaves = () => {
        let saveStr = ""

        const strSave = monsterData.strength_save
        const dexSave = monsterData.dexterity_save
        const conSave = monsterData.constitution_save
        const intSave = monsterData.intelligence_save
        const wisSave = monsterData.wisdom_save
        const chaSave = monsterData.charisma_save

        if (!strSave && !dexSave && !conSave && !intSave && !wisSave && !chaSave) {
            return null
        }
        if (strSave) {
            saveStr += `STR ${plusMinus(strSave)}, `
        }
        if (dexSave) {
            saveStr += `DEX ${plusMinus(dexSave)}, `
        }
        if (conSave) {
            saveStr += `CON ${plusMinus(conSave)}, `
        }
        if (intSave) {
            saveStr += `INT ${plusMinus(intSave)}, `
        }
        if (wisSave) {
            saveStr += `WIS ${plusMinus(wisSave)}, `
        }
        if (chaSave) {
            saveStr += `CHA ${plusMinus(chaSave)}, `
        }
        saveStr = saveStr.substring(0, saveStr.length - 2)
        return <div><span className={styles.bold}>Saving Throws </span><span>{saveStr}</span></div>
    }

    const getSkills = () => {
        if (!monsterData.skills || monsterData === "") {
            return null
        }
        let skillStr = ""
        for (const [skill, mod] of Object.entries(monsterData.skills)) {
            if (mod) {
                const upperCaseValue = skill.toString().charAt(0).toUpperCase() + skill.toString().slice(1)
                skillStr = skillStr.concat(upperCaseValue, " ", plusMinus(mod), ', ')
            }
        }
        skillStr = skillStr.substring(0, skillStr.length - 2)
        if (skillStr) {
            return <div><span className={styles.bold}>Skills </span><span>{skillStr}</span></div>
        } else {
            return null
        }
    }

    const getDamageVulnerabilities = () => {
        if (!monsterData.damage_vulnerabilities) {
            return null
        }
        return <div><span
            className={styles.bold}>Damage Vulnerabilities </span><span>{monsterData.damage_vulnerabilities}</span>
        </div>
    }

    const getDamageResistances = () => {
        if (!monsterData.damage_resistances) {
            return null
        }
        return <div><span
            className={styles.bold}>Damage Resistances </span><span>{monsterData.damage_resistances}</span>
        </div>
    }

    const getDamageImmunities = () => {
        if (!monsterData.damage_immunities) {
            return null
        }
        return <div><span className={styles.bold}>Damage Immunities </span><span>{monsterData.damage_immunities}</span>
        </div>
    }

    const getConditionImmunities = () => {
        if (!monsterData.condition_immunities) {
            return null
        }
        return <div><span
            className={styles.bold}>Condition Immunities </span><span>{monsterData.condition_immunities}</span></div>
    }

    const getSenses = () => {
        if (!monsterData.senses) {
            return null
        }
        return <div><span className={styles.bold}>Senses</span><span> {monsterData.senses}</span></div>
    }

    const getLanguages = () => {
        if (!monsterData.languages) {
            return null
        }
        return <div><span className={styles.bold}>Languages</span><span> {monsterData.languages}</span></div>
    }

    const getCR = () => {
        if (!monsterData.cr) {
            return null
        }
        return <div><span
            className={styles.bold}>Challenge</span><span> {monsterData.cr} ({crToXP(monsterData.cr)} XP)</span></div>
    }

    const getAbilities = (abilityList) => {
        if (!abilityList) {
            return null
        }
        return (
            abilityList.map((ability) => (
                <div key={monsterData.name + ability.name} className={styles.abilities}>
                    <span className={styles.abilityname}>{ability.name}. </span>
                    <span>{ability.desc}</span>
                </div>
            )))
    }

    const handleAttackRoll = (attack) => {
        rollAttack(attack, playerId, gameId, false)
    }

    const getActions = () => {

        if (!monsterData.actions) {
            return null
        }
        let actionList = []
        for (const action of monsterData.actions) {
            console.log(action)
            if (action.type === "Ability" || !action.attack_bonus) {
                actionList.push(
                    <div key={monsterData.name + action.name} className={styles.abilities}>
                        <span className={styles.abilityname}>{action.name}. </span>
                        <span>{action.desc}</span>
                    </div>
                )
            } else {
                const attack = descAttack(monsterData, action)
                actionList.push(
                    <div key={monsterData.name + action.name} className={styles.abilities}>
                        <label style={{width: "120px"}}
                               className={styles.labelButton} onClick={() => handleAttackRoll(attack)}>{attack}</label>
                    </div>
                )
            }
        }
        return actionList.map((action) => (action))
    }

    const getBonusActions = () => {
        if (monsterData.bonus_actions.length === 0) {
            return null
        }
        return (
            <div>
                <div className={styles.actions + " " + styles.red}>Bonus Actions</div>
                <div className={styles.hr}></div>
                {monsterData.bonus_actions.map((bonusAction) => (
                    <div key={bonusAction.name} className={styles.abilities}>
                        <span className={styles.abilityname}>{bonusAction.name}. </span>
                        <span>{bonusAction.desc}</span>
                    </div>
                ))}
            </div>
        )
    }


    const getReactions = () => {
        if (monsterData.reactions.length === 0) {
            return null
        }
        return (
            <div>
                <div className={styles.actions + " " + styles.red}>Reactions</div>
                <div className={styles.hr}></div>
                {monsterData.reactions.map((reaction) => (
                    <div key={reaction.name} className={styles.abilities}>
                        <span className={styles.abilityname}>{reaction.name}. </span>
                        <span>{reaction.desc}</span>
                    </div>
                ))}
            </div>
        )
    }

    const getLegendaryActions = () => {
        if (monsterData.legendary_actions.length === 0) {
            return null
        }
        return (
            <div>
                <div className={styles.actions + " " + styles.red}>Legendary Actions</div>
                <div className={styles.hr}></div>
                {monsterData.legendary_desc}
                {monsterData.legendary_actions.map((reaction) => (
                    <div key={reaction.name} className={styles.abilities}>
                        <span className={styles.abilityname}>{reaction.name}. </span>
                        <span>{reaction.desc}</span>
                    </div>
                ))}
            </div>
        )
    }

    const getMythicActions = () => {
        if (monsterData.mythic_actions.length === 0) {
            return null
        }
        return (
            <div>
                <div className={styles.actions + " " + styles.red}>Mythic Actions</div>
                <div className={styles.hr}></div>
                {monsterData.mythic_desc}
                {monsterData.mythic_actions.map((reaction) => (
                    <div key={reaction.name} className={styles.abilities}>
                        <span className={styles.abilityname}>{reaction.name}. </span>
                        <span>{reaction.desc}</span>
                    </div>
                ))}
            </div>
        )
    }

    if (!monsterData) {
        console.log('No monster data returned')
        return null
    } else {
        return (
            <div className={styles.monsterSheetContainer} ref={printRef}>
                <div className={styles.name}>{monsterData.name}</div>
                <div
                    className={styles.description}>{monsterData.size} {monsterData.type} {monsterData.subtype ? monsterData.subtype : null}, {monsterData.alignment}</div>

                <div className={styles.gradient}></div>

                <div className="red">
                    <div><span
                        className={styles.bold + ' ' + styles.red}>Armor Class</span><span> {monsterData.armor_class} {monsterData.armor_desc ? `(${monsterData.armor_desc})` : null}</span>
                    </div>
                    <div><span
                        className={styles.bold + ' ' + styles.red}>Hit Points</span><span> {monsterData.hit_points} ({monsterData.hit_dice})</span>
                    </div>
                    <div><span className={styles.bold + ' ' + styles.red}>Speed</span><span> {getSpeed()}</span></div>
                </div>

                <div className={styles.gradient}></div>
                {getAbilityScores()}

                <div className={styles.gradient}></div>
                {getSaves()}
                {getSkills()}
                {getDamageVulnerabilities()}
                {getDamageResistances()}
                {getDamageImmunities()}
                {getConditionImmunities()}
                {getSenses()}
                {getLanguages()}
                {getCR()}

                <div className={styles.gradient}></div>

                {getAbilities(monsterData.special_abilities)}

                <div className={styles.actions + " " + styles.red}>Actions</div>

                <div className={styles.hr}></div>
                {getActions()}
                {getBonusActions()}
                {getReactions()}
                {getLegendaryActions()}
                {getMythicActions()}
            </div>
        );
    }
}

export default MonsterSheet