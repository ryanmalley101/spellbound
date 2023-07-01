import React, {useEffect, useState} from "react";
import styles from "@/styles/MonsterSheet.module.css"
import {crToXP, scoreToMod} from "@/5eReference/converters";

const MonsterSheet = ({slug}) => {
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

    fetchData();
  }, [slug]);

  const plusMinus = (save) => {
    if (Number(save) >= 0) {
      return '+' + save.toString()
    }
  }

  const getSpeed = () => {
    if (!monsterData.speed) {
      return null
    }
    let speedString = ""
    for (const [key, value] of Object.entries(monsterData.speed)) {
      speedString = speedString.concat(key, " ", value.toString(), ' ft., ')
    }
    speedString = speedString.substring(0, speedString.length - 2)
    console.log(speedString)
    return speedString
  }

  const getAbilityScores = () => {
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
    if (!monsterData.skills) {
      return null
    }
    let skillStr = ""
    for (const [skill, mod] of Object.entries(monsterData.skills)) {
      const upperCaseValue = skill.toString().charAt(0).toUpperCase() + skill.toString().slice(1)
      skillStr = skillStr.concat(upperCaseValue, " ", plusMinus(mod), ', ')
    }
    skillStr = skillStr.substring(0, skillStr.length - 2)
    console.log(skillStr)
    return <div><span className={styles.bold}>Saving Throws </span><span>{skillStr}</span></div>
  }

  const getDamageVulnerabilities = () => {
    if (!monsterData.damage_vulnerabilities) {
      return null
    }
    return <div><span
      className={styles.bold}>Damage Vulnerabilities </span><span>{monsterData.damage_vulnerabilities}</span></div>
  }

  const getDamageResistances = () => {
    if (!monsterData.damage_resistances) {
      return null
    }
    return <div><span className={styles.bold}>Damage Resistances </span><span>{monsterData.damage_resistances}</span>
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
        <div key={ability.name} className={styles.abilities}>
          <span className={styles.abilityname}>{ability.name}. </span>
          <span>{ability.desc}</span>
        </div>
      )))
  }

  const getActions = () => {
    if (!monsterData.actions) {
      return null
    }
    let actionList = []
    for (const action of monsterData.actions) {
      console.log(action)
      actionList = actionList.concat(
        <div key={action.name} className={styles.abilities}>
          <span className={styles.abilityname}>{action.name}. </span>
          <span>{action.desc}</span>
        </div>
      )
    }
    return actionList.map((action) => (action))
  }

  const getReactions = () => {
    if (!monsterData.reactions) {
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
    if (!monsterData.legendary_actions) {
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

  if (!monsterData) {
    console.log('No monster data returned')
    return null
  } else {
    return (
      <div>
        <div className={styles.name}>{monsterData.name}</div>
        <div className={styles.description}>{monsterData.size} {monsterData.type}, {monsterData.alignment}</div>

        <div className={styles.gradient}></div>

        <div className="red">
          <div><span
            className={styles.bold + ' ' + styles.red}>Armor Class</span><span> {monsterData.armor_class} ({monsterData.armor_desc})</span>
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
        {getReactions()}
        {getLegendaryActions()}

      </div>
    );
  }
}

export default MonsterSheet