import styles from "@/styles/CharacterSheet.module.css"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getExampleCharacter} from "@/5eReference/characterSheetGenerators";
import {scoreToMod} from "@/5eReference/converters";


const CharacterSheet = ({characterSheet}) => {
  const AttackRow = ({attack, index}) => {
    return (
      <tr>
        <td>
          <input
            type="text"
            name={`attacks[${index}].name`}
            value={attack.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            type="text"
            name={`attacks[${index}].attack_bonus`}
            value={attack.attack_bonus}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            type="text"
            name={`attacks[${index}].damage_dice`}
            value={attack.damage_dice}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td colSpan={2}>
          <input
            type="text"
            name={`attacks[${index}].notes`}
            value={attack.notes}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
      </tr>
    )
  }

  const SpellRow = ({spell, index}) => {

    return (
      <tr key={index}>
        <td>
          <input
            name={`spells[${index}].prepared`}
            type="checkbox"
            onChange={handleCheckboxClick}
            checked={spell.prepared}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].name`}
            type="text"
            value={spell.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].level`}
            type="text"
            value={spell.level}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].source`}
            type="text"
            value={spell.source}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].attack_save`}
            type="text"
            value={spell.attack_save}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].cast_time`}
            type="text"
            value={spell.cast_time}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].range_shape`}
            type="text"
            value={spell.range_shape}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].duration`}
            type="text"
            value={spell.duration}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].components`}
            type="text"
            value={spell.components}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`spells[${index}].notes`}
            type="text"
            value={spell.notes}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
      </tr>
    )
  }

  const InventoryRow = ({item, index}) => {
    return (
      <tr key={index}>
        <td>
          <input
            name={`inventory[${index}].equipped`}
            type="checkbox"
            onChange={handleCheckboxClick}
            checked={item.equipped}
          />
        </td>
        <td>
          <input
            name={`inventory[${index}].name`}
            type="text"
            value={item.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`inventory[${index}].count`}
            type="text"
            value={item.count}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`inventory[${index}].weight`}
            type="text"
            value={item.weight}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`inventory[${index}].value`}
            type="text"
            value={item.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
        <td>
          <input
            name={`inventory[${index}].notes`}
            type="text"
            value={item.notes}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </td>
      </tr>
    )
  }

  const [character, setCharacter] = useState(characterSheet);

  const {register, setValue, handleSubmit} = useForm();

  // Load character sheet values into form inputs on component mount
  useEffect(() => {
    console.log(characterSheet)
    const initializeCharacter = async () => {
      await setCharacter({...characterSheet})
      Object.keys(character).forEach((fieldName) => {
        setValue(fieldName, character[fieldName]);
      });
    }
    initializeCharacter().then(() => console.log(character))
    // Iterate over the character sheet properties and set their values in the form

  }, []);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value)
    setCharacter((prevEditableCharacterSheet) => ({
      ...prevEditableCharacterSheet,
      [name]: value
    }));
  };


  const handleInputBlur = () => {
    // Perform backend update here
    // You can access the updated character sheet using 'editableCharacterSheet'
    console.log('Sending update to the backend:', character);
  };

  const handleCheckboxClick = (e) => {
    const newCharacter = {...character}
    newCharacter[e.target.name] = !newCharacter[e.target.name]
    setCharacter(newCharacter)
    handleInputBlur()
    console.log(e.target.name)
  }

  const addInventory = () => {
    setCharacter({
      ...character,
      inventory: character.inventory.concat({
        equipped: false,
        name: "",
        count: 0,
        weight: 0,
        value: "",
        notes: ""
      })
    })
  }

  const removeInventory = () => {
    return null
  }

  const removeLastRow = () => {
    return null
  }

  const addSpell = () => {
    setCharacter({
      ...character,
      spells: character.spells.concat({
        prepared: false,
        name: "",
        level: 0,
        source: "",
        attack_save: "",
        cast_time: "",
        range_shape: "",
        duration: "",
        components: "",
        notes: ""
      })
    })
  }

  const addAttunement = () => {
    return null
  }

  const addAttack = () => {
    setCharacter({
      ...character,
      attacks: character.attacks.concat({name: "", notes: "", attack_bonus: 0, damage_dice: ""})
    })
  }

  const longRest = () => {
    return null
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form className={styles.charsheet} id="charsheet">
      <header>
        <section className={styles.charname}>
          <label form="name">Character Name</label><input name="name" id="name"
                                                          value={character.name}
                                                          onChange={handleInputChange}
                                                          onBlur={handleInputBlur}
                                                          placeholder="Character Name"/>
        </section>
        <section className={styles.misc}>
          <ul>
            <li>
              <label form="class_level">Class &amp; Level</label><input name="class_level" placeholder="Class 1"
                                                                        value={character.class_level}
                                                                        onChange={handleInputChange}
                                                                        onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="background">Background</label><input name="background" placeholder="Background"
                                                                value={character.background}
                                                                onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="player_name">Player Name</label><input name="player_name" placeholder="Player Name"
                                                                  value={character.player_name}
                                                                  onChange={handleInputChange}
                                                                  onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="race">Race</label><input name="race" placeholder="Race" value={character.race}
                                                    onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="alignment">Alignment</label><input name="alignment" placeholder="Alignment"
                                                              value={character.alignment} onChange={handleInputChange}
                                                              onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="xp">Experience Points</label><input name="xp" placeholder={"0"} value={character.xp}
                                                               onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
          </ul>
        </section>
      </header>
      <main>
        <section>
          <section className={styles.attributes}>
            <div className={styles.scores}>
              <ul>
                <li>
                  <div className={styles.score}>
                    <label form="strength_score">Strength</label><input name="strength_score" placeholder={"10"}
                                                                        value={character.strength_score}
                                                                        onChange={handleInputChange}
                                                                        onBlur={handleInputBlur}
                                                                        className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="strength_mod" placeholder={"+0"} className={styles.statmod}
                           value={scoreToMod(character.strength_score)} readOnly={true}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="dexterity_score">Dexterity</label><input name="dexterity_score" placeholder={"10"}
                                                                          value={character.dexterity_score}
                                                                          onChange={handleInputChange}
                                                                          onBlur={handleInputBlur}
                                                                          className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="dexterity_mod" placeholder={"+0"} className={styles.statmod}
                           value={scoreToMod(character.dexterity_score)} readOnly={true}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="constitution_score">Constitution</label><input name="constitution_score"
                                                                                placeholder={"10"}
                                                                                value={character.constitution_score}
                                                                                onChange={handleInputChange}
                                                                                onBlur={handleInputBlur}
                                                                                className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="constitution_mod" placeholder={"+0"} className={styles.statmod}
                           value={scoreToMod(character.constitution_score)} readOnly={true}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="intelligence_score">Intelligence</label><input name="intelligence_score"
                                                                                placeholder={"10"}
                                                                                value={character.intelligence_score}
                                                                                onChange={handleInputChange}
                                                                                onBlur={handleInputBlur}
                                                                                className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="intelligence_mod" placeholder={"+0"} className={styles.statmod}
                           value={scoreToMod(character.intelligence_score)} readOnly={true}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="wisdom_score">Wisdom</label><input name="wisdom_score" placeholder={"10"}
                                                                    value={character.wisdom_score}
                                                                    onChange={handleInputChange}
                                                                    onBlur={handleInputBlur}
                                                                    className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="wisdom_mod" placeholder={"+0"} value={scoreToMod(character.wisdom_score)}
                           readOnly={true}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="charisma_score">Charisma</label><input name="charisma_score" placeholder={"10"}
                                                                        value={character.charisma_score}
                                                                        onChange={handleInputChange}
                                                                        onBlur={handleInputBlur}
                                                                        className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="charisma_mod" placeholder={"+0"} className={styles.statmod}
                           value={scoreToMod(character.charisma_score)} readOnly={true}/>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className={styles.proficiencybonus + " " + styles.box}>
                <div className={styles.labelContainer}>
                  <label form="inspiration">Inspiration</label>
                </div>
                <input name="inspiration" value={character.inspiration} onChange={handleInputChange}
                       onBlur={handleInputBlur}/>
              </div>
              <div className={styles.proficiencybonus + " " + styles.box}>
                <div className={styles.labelContainer}>
                  <label form="proficiencybonus">Proficiency Bonus</label>
                </div>
                <input name="proficiency_bonus" placeholder={"+2"} value={character.proficiency_bonus}
                       onChange={handleInputChange} onBlur={handleInputBlur}/>
              </div>
              <div className={"saves " + styles.listSection + " " + styles.box}
                //      style={{
                //   border: "1px solid black",
                //   borderRadius: "10px",
                //   padding: "10px 5px"
                // }}
              >
                <ul>
                  <li>
                    <label form="strength_save">Strength</label><input name="strength_save_mod" placeholder={"+0"}
                                                                       type="text" value={character.strength_save_mod}
                                                                       onChange={handleInputChange}
                                                                       onBlur={handleInputBlur}/>
                    <input name="strength_save_prof" type="checkbox" onChange={handleCheckboxClick}
                           checked={character.strength_save_prof}/>
                  </li>
                  <li>
                    <label form="dexterity_save">Dexterity</label><input name="dexterity_save_mod" placeholder={"+0"}
                                                                         type="text"
                                                                         value={character.dexterity_save_mod}
                                                                         onChange={handleInputChange}
                                                                         onBlur={handleInputBlur}/>
                    <input
                      name="dexterity_save_prof"
                      type="checkbox" onChange={handleCheckboxClick} checked={character.dexterity_save_prof}/>
                  </li>
                  <li>
                    <label form="constitution_save">Constitution</label><input name="constitution_save_mod"
                                                                               placeholder={"+0"}
                                                                               type="text"
                                                                               value={character.constitution_save_mod}
                                                                               onChange={handleInputChange}
                                                                               onBlur={handleInputBlur}/><input
                    name="constitution_save_prof" type="checkbox" onChange={handleCheckboxClick}
                    checked={character.constitution_save_prof}/>
                  </li>
                  <li>
                    <label form="intelligence_save">Intelligence</label><input name="intelligence_save_mod"
                                                                               placeholder={"+0"}
                                                                               type="text"
                                                                               value={character.intelligence_save_mod}
                                                                               onChange={handleInputChange}
                                                                               onBlur={handleInputBlur}/><input
                    name="intelligence_save_prof" type="checkbox" onChange={handleCheckboxClick}
                    checked={character.intelligence_save_prof}/>
                  </li>
                  <li>
                    <label form="wisdom_save">Wisdom</label><input name="wisdom_save_mod" placeholder={"+0"}
                                                                   type="text" value={character.wisdom_save_mod}
                                                                   onChange={handleInputChange}
                                                                   onBlur={handleInputBlur}/>
                    <input name="wisdom_save_prof" type="checkbox" onChange={handleCheckboxClick}
                           checked={character.wisdom_save_prof}/>
                  </li>
                  <li>
                    <label form="charisma_save">Charisma</label><input name="charisma_save_mod" placeholder={"+0"}
                                                                       type="text" value={character.charisma_save_mod}
                                                                       onChange={handleInputChange}
                                                                       onBlur={handleInputBlur}/>
                    <input name="charisma_save_prof" type="checkbox" onChange={handleCheckboxClick}
                           checked={character.charisma_save_prof}/>
                  </li>
                </ul>
                <div className={styles.label}>
                  Saving Throws
                </div>
              </div>
              <div className={styles.skills + " " + styles.listSection + " " + styles.box}>
                <ul>
                  <li>
                    <label form="acrobatics">Acrobatics <span className={styles.skill}>(Dex)</span></label><input
                    name="acrobatics_mod" placeholder={"+0"} type="text" value={character.acrobatics_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="acrobatics_prof" type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.acrobatics_prof}/>
                  </li>
                  <li>
                    <label form="animal handling">Animal Handling <span
                      className={styles.skill}>(Wis)</span></label><input
                    name="animal_handling_mod" placeholder={"+0"} type="text" value={character.animal_handling_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="animal_handling_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.animal_handling_prof}/>
                  </li>
                  <li>
                    <label form="arcana">Arcana <span className={styles.skill}>(Int)</span></label>
                    <input
                      name="arcana_mod"
                      placeholder={"+0"}
                      type="text"
                      value={character.arcana_mod}
                      onChange={handleInputChange} onBlur={handleInputBlur}
                    />
                    <input
                      name="arcana_prof" type="checkbox" onChange={handleCheckboxClick} checked={character.arcana_prof}
                    />
                  </li>
                  <li>
                    <label form="athletics">Athletics <span className={styles.skill}>(Str)</span></label><input
                    name="athletics_mod" placeholder={"+0"} type="text" value={character.athletics_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="athletics_prof" type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.athletics_prof}/>
                  </li>
                  <li>
                    <label form="deception">Deception <span className={styles.skill}>(Cha)</span></label><input
                    name="deception_mod" placeholder={"+0"} type="text" value={character.deception_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="deception_prof" type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.deception_prof}/>
                  </li>
                  <li>
                    <label form="history">History <span className={styles.skill}>(Int)</span></label>
                    <input
                      name="history_mod"
                      placeholder={"+0"}
                      type="text"
                      value={character.history_mod}
                      onChange={handleInputChange} onBlur={handleInputBlur}
                    />
                    <input
                      name="history_prof" type="checkbox" onChange={handleCheckboxClick}
                      checked={character.history_prof}/>
                  </li>
                  <li>
                    <label form="insight">Insight <span className={styles.skill}>(Wis)</span></label>
                    <input
                      name="insight_mod"
                      placeholder={"+0"}
                      type="text"
                      value={character.insight_mod}
                      onChange={handleInputChange} onBlur={handleInputBlur}
                    />
                    <input
                      name="insight_prof" type="checkbox" onChange={handleCheckboxClick}
                      checked={character.insight_prof}/>
                  </li>
                  <li>
                    <label form="intimidation">Intimidation <span className={styles.skill}>(Cha)</span></label><input
                    name="intimidation_mod" placeholder={"+0"} type="text" value={character.intimidation_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="intimidation_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.intimidation_prof}/>
                  </li>
                  <li>
                    <label form="investigation">Investigation <span className={styles.skill}>(Int)</span></label><input
                    name="investigation_mod" placeholder={"+0"} type="text" value={character.investigation_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="investigation_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.investigation_prof}/>
                  </li>
                  <li>
                    <label form="medicine">Medicine <span className={styles.skill}>(Wis)</span></label><input
                    name="medicine_mod"
                    placeholder={"+0"}
                    type="text"
                    value={character.medicine_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}
                  /><input
                    name="medicine_prof" type="checkbox" onChange={handleCheckboxClick}
                    checked={character.medicine_prof}/>
                  </li>
                  <li>
                    <label form="nature">Nature <span className={styles.skill}>(Int)</span></label>
                    <input
                      name="nature_mod"
                      placeholder={"+0"}
                      type="text"
                      value={character.nature_mod}
                      onChange={handleInputChange} onBlur={handleInputBlur}
                    />
                    <input
                      name="nature_prof" type="checkbox" onChange={handleCheckboxClick}
                      checked={character.nature_prof}/>
                  </li>
                  <li>
                    <label form="perception">Perception <span className={styles.skill}>(Wis)</span></label><input
                    name="perception_mod" placeholder={"+0"} type="text" value={character.perception_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="perception_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.perception_prof}/>
                  </li>
                  <li>
                    <label form="performance">Performance <span className={styles.skill}>(Cha)</span></label><input
                    name="performance_mod" placeholder={"+0"} type="text" value={character.performance_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="performance_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.performance_prof}/>
                  </li>
                  <li>
                    <label form="persuasion">Persuasion <span className={styles.skill}>(Cha)</span></label><input
                    name="persuasion_mod" placeholder={"+0"} type="text" value={character.persuasion_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="persuasion_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.persuasion_prof}/>
                  </li>
                  <li>
                    <label form="religion">Religion <span className={styles.skill}>(Int)</span></label>
                    <input
                      name="religion_mod"
                      placeholder={"+0"}
                      type="text"
                      value={character.religion_mod}
                      onChange={handleInputChange} onBlur={handleInputBlur}
                    /><input
                    name="religion_prof" type="checkbox" onChange={handleCheckboxClick}
                    checked={character.religion_prof}
                    onBlur={handleInputBlur}/>
                  </li>
                  <li>
                    <label form="sleight_of_hand">Sleight of Hand <span
                      className={styles.skill}>(Dex)</span></label><input
                    name="sleight_of_hand_mod" placeholder={"+0"} type="text" value={character.sleight_of_hand_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}/><input name="sleight_of_hand_prof"
                                                                                  type="checkbox"
                                                                                  onChange={handleCheckboxClick}
                                                                                  checked={character.sleight_of_hand_prof}/>
                  </li>
                  <li>
                    <label form="stealth">Stealth <span className={styles.skill}>(Dex)</span></label><input
                    name="stealth_mod"
                    placeholder={"+0"}
                    type="text"
                    value={character.stealth_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}
                  />
                    <input
                      name="stealth_prof" type="checkbox" onChange={handleCheckboxClick}
                      checked={character.stealth_prof}/>
                  </li>
                  <li>
                    <label form="survival">Survival <span className={styles.skill}>(Wis)</span></label><input
                    name="survival_mod"
                    placeholder={"+0"}
                    type="text"
                    value={character.survival_mod}
                    onChange={handleInputChange} onBlur={handleInputBlur}
                  /><input
                    name="survival_prof" type="checkbox" onChange={handleCheckboxClick}
                    checked={character.survival_prof}/>
                  </li>
                </ul>
                <div className={styles.label}>
                  Skills
                </div>
              </div>
            </div>
          </section>
        </section>
        <section>
          <section className={styles.combat}>
            <div className={styles.armorclass}>
              <div>
                <label form="ac">Armor Class</label><input name="ac" placeholder={"10"} type="text" value={character.ac}
                                                           onChange={handleInputChange} onBlur={handleInputBlur}/>
              </div>
            </div>
            <div className={styles.initiative}>
              <div>
                <label form="initiative">Initiative</label><input name="initiative" placeholder={"+0"} type="text"
                                                                  value={character.initiative}
                                                                  onChange={handleInputChange}
                                                                  onBlur={handleInputBlur}/>
              </div>
            </div>
            <div className={styles.speed}>
              <div>
                <label form="speed">Speed</label><input name="speed" placeholder="30ft" type="text"
                                                        value={character.speed} onChange={handleInputChange}
                                                        onBlur={handleInputBlur}/>
              </div>
            </div>
            <div className={styles.armorclass}>
              <div>
                <label form="current_hp">Current Hit Points</label><input name="current_hp" placeholder={"10"}
                                                                          value={character.current_hp}
                                                                          onChange={handleInputChange}
                                                                          onBlur={handleInputBlur}
                                                                          type="text"/>
              </div>
            </div>
            <div className={styles.initiative}>
              <div>
                <label form="max_hp">Hit Point Maximum</label><input name="max_hp" placeholder={"10"} type="text"
                                                                     value={character.max_hp}
                                                                     onChange={handleInputChange}
                                                                     onBlur={handleInputBlur}/>
              </div>
            </div>
            <div className={styles.speed}>
              <div>
                <label form="temp_hp">Temporary Hit Points</label><input name="temp_hp" placeholder={"0"} type="text"
                                                                         value={character.temp_hp}
                                                                         onChange={handleInputChange}
                                                                         onBlur={handleInputBlur}/>
              </div>
            </div>
            <div className={styles.hitdice}>
              <div>
                <div className={styles.total}>
                  <label form="total_hd">Total</label><input name="total_hd" placeholder="_d__" type="text"
                                                             value={character.total_hd} onChange={handleInputChange}
                                                             onBlur={handleInputBlur}/>
                </div>
                <div className={styles.remaining}>
                  <label form="current_hd">Hit Dice</label><input name="current_hd" type="text"
                                                                  value={character.current_hd}
                                                                  onChange={handleInputChange}
                                                                  onBlur={handleInputBlur}/>
                </div>
              </div>
            </div>
            <div className={styles.deathsaves}>
              <div>
                <div className={styles.label}>
                  <label>Death Saves</label>
                </div>
                <div className={styles.listSection + " " + styles.marks}>
                  <div className={styles.deathsuccesses}>
                    <label>Successes</label>
                    <div className={styles.bubbles}>
                      <input name="death_success_1" type="checkbox" onChange={handleCheckboxClick}
                             checked={character.death_success_1}/>
                      <input name="death_success_2" type="checkbox" onChange={handleCheckboxClick}
                             checked={character.death_success_2}/>
                      <input name="death_success_3" type="checkbox" onChange={handleCheckboxClick}
                             checked={character.death_success_3}/>
                    </div>
                  </div>
                  <div className={styles.deathfails}>
                    <label>Failures</label>
                    <div className={styles.bubbles}>
                      <input name="death_fail_1" type="checkbox" onChange={handleCheckboxClick}
                             checked={character.death_fail_1}/>
                      <input name="death_fail_2" type="checkbox" onChange={handleCheckboxClick}
                             checked={character.death_fail_2}/>
                      <input name="death_fail_3" type="checkbox" onChange={handleCheckboxClick}
                             checked={character.death_fail_3}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.otherprofs + " " + styles.box + " " + styles.textblock}>
            <label form="other_profs">Other Proficiencies and Languages</label><textarea className={styles.textarea}
                                                                                         name="other_profs"
                                                                                         value={character.other_profs}
                                                                                         onChange={handleInputChange}
                                                                                         onBlur={handleInputBlur}/>
          </div>
        </section>
        <section>
          <section className={styles.flavor}>
            <div className={styles.personality}>
              <label form="defenses">Defenses &amp; Active Conditions</label><textarea className={styles.textarea}
                                                                                       name="defenses"
                                                                                       value={character.defenses}
                                                                                       onChange={handleInputChange}
                                                                                       onBlur={handleInputBlur}/>
            </div>
            <div className={styles.ideals}>
              <label form="save_notes">Saving Throw Notes</label><textarea className={styles.textarea} name="save_notes"
                                                                           value={character.save_notes}
                                                                           onChange={handleInputChange}
                                                                           onBlur={handleInputBlur}/>
            </div>
            <div className={styles.bonds}>
              <label form="movement">Movement Speeds</label><textarea className={styles.textarea} name="movement"
                                                                      value={character.movement}
                                                                      onChange={handleInputChange}
                                                                      onBlur={handleInputBlur}/>
            </div>
            <div className={styles.flaws}>
              <label form="senses">Senses</label><textarea className={styles.textarea} name="senses"
                                                           value={character.senses} onChange={handleInputChange}
                                                           onBlur={handleInputBlur}/>
            </div>
          </section>
          <div className={styles.passivePerception + " " + styles.box}>
            <div className={styles.labelContainer}>
              <label form="passive_perception">Passive Wisdom (Perception)</label>
            </div>
            <input name="passive_perception" placeholder={"10"} value={character.passive_perception}
                   onChange={handleInputChange} onBlur={handleInputBlur}/>
          </div>
          <div className={styles.passivePerception + " " + styles.box}>
            <div className={styles.labelContainer}>
              <label form="passive_insight">Passive Wisdom (Insight)</label>
            </div>
            <input name="passive_insight" placeholder={"10"} value={character.passive_insight}
                   onChange={handleInputChange} onBlur={handleInputBlur}/>
          </div>
          <div className={styles.passivePerception + " " + styles.box}>
            <div className={styles.labelContainer}>
              <label form="passive_investigation">Passive Intelligence (Investigation)</label>
            </div>
            <input name="passive_investigation" placeholder={"10"} value={character.passive_investigation}
                   onChange={handleInputChange} onBlur={handleInputBlur}/>
          </div>
        </section>
      </main>
      <header>
        <section className={styles.attacksandspellcasting}>
          <div>
            <label>Attacks &amp; Spellcasting</label>
            <table>
              <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Attack Bonus
                </th>
                <th>
                  Damage/Type
                </th>
                <th colSpan={2}>
                  Notes
                </th>
              </tr>
              </thead>
              <tbody id="attacktable">
              {character.attacks.map((attack, index) => (
                <AttackRow key={index} attack={attack} index={index}/>
              ))}
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-addattack" type="button" onClick={addAttack}
                  style={{width: '20%'}}>Add New Attack</button>
          <button className={styles.button} name="button-removeattack" type="button"
                  onClick={removeLastRow('attacktable')}
                  style={{width: '20%'}}>Remove Attack</button>
        </span>
            <textarea className={styles.textarea} name="attacksnotes" value={character.attack_notes}
                      onChange={handleInputChange} onBlur={handleInputBlur}/>
          </div>
        </section>
      </header>
      <hr className={styles.pageborder}/>
      <header>
        <section className={styles.attacksandspellcasting} id="spellslots">
          <div>
            <label>Spell Slots</label>
            <table>
              <thead>
              <tr>
                <th>Level</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Available</td>
                <td><input name="spell_slots_1" type="text" value={character.spell_slots_1} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_2" type="text" value={character.spell_slots_2} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_3" type="text" value={character.spell_slots_3} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_4" type="text" value={character.spell_slots_4} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_5" type="text" value={character.spell_slots_5} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_6" type="text" value={character.spell_slots_6} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_7" type="text" value={character.spell_slots_7} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_8" type="text" value={character.spell_slots_8} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_9" type="text" value={character.spell_slots_9} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td><input name="spell_slots_max_1" type="text" placeholder={"0"} value={character.spell_slots_max_1}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_2" type="text" placeholder={"0"} value={character.spell_slots_max_2}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_3" type="text" placeholder={"0"} value={character.spell_slots_max_3}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_4" type="text" placeholder={"0"} value={character.spell_slots_max_4}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_5" type="text" placeholder={"0"} value={character.spell_slots_max_5}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_6" type="text" placeholder={"0"} value={character.spell_slots_max_6}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_7" type="text" placeholder={"0"} value={character.spell_slots_max_7}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_8" type="text" placeholder={"0"} value={character.spell_slots_max_8}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                <td><input name="spell_slots_max_9" type="text" placeholder={"0"} value={character.spell_slots_max_9}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.attacksandspellcasting} id="pactslots" style={{width: '20%'}}>
          <div>
            <label>Pact Slots</label>
            <table>
              <thead>
              <tr>
                <th>Level</th>
                <th><input name="pact_level" type="text" value={character.pact_level} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Available</td>
                <td><input name="pact_available" type="text" value={character.pact_available}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td><input name="pact_maximum" type="text" placeholder={"0"} value={character.pact_maximum}
                           onChange={handleInputChange} onBlur={handleInputBlur}/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
      </header>
      <header>
        <section className={styles.attacksandspellcasting} id="spells">
          <div>
            <label>Spell List</label>
            <table>
              <thead>
              <tr>
                <th>
                  Prepared
                </th>
                <th>
                  Name
                </th>
                <th>
                  Level
                </th>
                <th>
                  Source
                </th>
                <th>
                  Attack/Save
                </th>
                <th>
                  Cast Time
                </th>
                <th>
                  Range/Shape
                </th>
                <th>
                  Duration
                </th>
                <th>
                  Components
                </th>
                <th>
                  Notes
                </th>
              </tr>
              </thead>
              <tbody id="spelltable">
              {character.spells.map((attack, index) => (
                <SpellRow key={index} spell={attack} index={index}/>
              ))}
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-addspell" type="button" onClick={addSpell}
                  style={{width: '20%'}}>Add New Spell</button>
          <button className={styles.button} name="button-removespell" type="button"
                  onClick={removeLastRow('spelltable')}
                  style={{width: '20%'}}>Remove Spell</button>
        </span>
            <textarea className={styles.textarea} name="spells_notes" placeholder="Additional spell notes"
                      value={character.spells_notes}
                      onChange={handleInputChange} onBlur={handleInputBlur}/>

          </div>
        </section>
      </header>
      <hr className={styles.pageborder}/>
      <header>
        <section className={styles.encumberance} id="encumberancetable" style={{width: '30%'}}>
          <div>
            <label style={{order: 0, padding: '5px'}}>Encumberance</label>
            <div>
              <table>
                <tbody>
                <tr>
                  <th>Weight Carried</th>
                </tr>
                <tr>
                  <td><input name="weight_carried" id="weight_carried" placeholder={"0"}
                             value={character.weight_carried} onChange={handleInputChange} onBlur={handleInputBlur}/>
                  </td>
                </tr>
                <tr>
                  <th>Weight Capacity</th>
                </tr>
                <tr>
                  <td><input name="weight_capacity" placeholder={"0"} value={character.weight_capacity}
                             onChange={handleInputChange} onBlur={handleInputBlur}/></td>
                </tr>
                </tbody>
              </table>
              <textarea className={styles.textarea} name="encumberance_notes"
                        placeholder="Additional encumberance notes"
                        style={{height: '12em'}} value={character.encumberance_notes}
                        onChange={handleInputChange} onBlur={handleInputBlur}
              />
            </div>
          </div>
        </section>
        <section className={styles.currency} style={{width: '30%'}}>
          <div>
            <label style={{order: 0, padding: '5px'}}>Currency</label>
            <div className={styles.money}>
              <ul>
                <li>
                  <label form="pp">pp</label><input name="pp" value={character.pp} onChange={handleInputChange}
                                                    onBlur={handleInputBlur}/>
                </li>
                <li>
                  <label form="gp">gp</label><input name="gp" value={character.gp} onChange={handleInputChange}
                                                    onBlur={handleInputBlur}/>
                </li>
                <li>
                  <label form="ep">ep</label><input name="ep" value={character.ep} onChange={handleInputChange}
                                                    onBlur={handleInputBlur}/>
                </li>
                <li>
                  <label form="sp">sp</label><input name="sp" value={character.sp} onChange={handleInputChange}
                                                    onBlur={handleInputBlur}/>
                </li>
                <li>
                  <label form="cp">cp</label><input name="cp" value={character.cp} onChange={handleInputChange}
                                                    onBlur={handleInputBlur}/>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.attacksandspellcasting} id="attunement">
          <div>
            <label style={{order: 0, padding: '5px'}}>Attunement</label>
            <table>
              <thead>
              <tr>
                <th>Attuned Magic Items</th>
              </tr>
              </thead>
              <tbody id="attunementtable">
              <tr>
                <td><input name="attunement0" type="text" value={character.attunement0} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
              </tr>
              <tr>
                <td><input name="attunement1" type="text" value={character.attunement1} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
              </tr>
              <tr>
                <td><input name="attunement2" type="text" value={character.attunement2} onChange={handleInputChange}
                           onBlur={handleInputBlur}/></td>
              </tr>
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-addattunement" type="button" onClick={addAttunement}
                  style={{width: '45%'}}>Add Attunement Slot</button>
          <button className={styles.button} name="button-removeattunement" type="button"
                  onClick={removeLastRow('attunementtable')}
                  style={{width: '45%'}}>Remove Attunement Slot</button>
        </span>
            <textarea className={styles.textarea} name="attunement_notes" placeholder="Additional attunement notes"
                      value={character.attunement_notes}
                      onChange={handleInputChange} onBlur={handleInputBlur}
            />
          </div>
        </section>
      </header>
      <header>
        <section className={styles.attacksandspellcasting} id="inventory">
          <div>
            <label>Inventory</label>
            <table>
              <thead>
              <tr>
                <th>
                  Equipped
                </th>
                <th>
                  Name
                </th>
                <th>
                  Count
                </th>
                <th>
                  Weight
                </th>
                <th>
                  Value
                </th>
                <th>
                  Notes
                </th>
              </tr>
              </thead>
              <tbody id="inventorytable">
              {character.inventory.map((item, index) => (
                <InventoryRow key={index} item={item} index={index}/>
              ))}
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-additem" type="button" onClick={addInventory}
                  style={{width: '20%'}}>Add New Item</button>
          <button className={styles.button} name="button-removeitem" type="button" onClick={removeInventory}
                  style={{width: '20%'}}>Remove Item</button>
        </span>
            <textarea className={styles.textarea} name="inventory_notes" placeholder="Additional inventory notes"
                      value={character.inventory_notes}
                      onChange={handleInputChange} onBlur={handleInputBlur}
            />
          </div>
        </section>
      </header>
      <hr className={styles.pageborder}/>
      <main>
        <section className={styles.features} id="features_left">
          <div>
            <label form="features-l">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                    name="features_left"
                                                                                    value={character.features_left}
                                                                                    onChange={handleInputChange}
                                                                                    onBlur={handleInputBlur}
          />
          </div>
        </section>
        <section className={styles.features} id="features_center">
          <div>
            <label form="features-c">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                    name="features_center"
                                                                                    value={character.features_center}
                                                                                    onChange={handleInputChange}
                                                                                    onBlur={handleInputBlur}
          />
          </div>
        </section>
        <section className={styles.features} id="features_right">
          <div>
            <label form="features-r">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                    name="features_right"
                                                                                    value={character.features_right}
                                                                                    onChange={handleInputChange}
                                                                                    onBlur={handleInputBlur}
          />
          </div>
        </section>
      </main>
      <hr className={styles.pageborder}/>
      <header>
        <section className={styles.misc} id="misc-desc">
          <ul>
            <li>
              <label form="gender">Gender</label><input name="gender" placeholder="Gender" value={character.gender}
                                                        onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="age">Age</label><input name="age" placeholder="Age" value={character.age}
                                                  onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="height">Height</label><input name="height" placeholder="Height" value={character.height}
                                                        onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="weight">Weight</label><input name="weight" placeholder="Weight" value={character.weight}
                                                        onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="faith">Faith</label><input name="faith" placeholder="Faith" value={character.faith}
                                                      onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="skin">Skin</label><input name="skin" placeholder="Skin" value={character.skin}
                                                    onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="eyes">Eyes</label><input name="eyes" placeholder="Eyes" value={character.eyes}
                                                    onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
            <li>
              <label form="hair">Hair</label><input name="hair" placeholder="Hair" value={character.hair}
                                                    onChange={handleInputChange} onBlur={handleInputBlur}/>
            </li>
          </ul>
        </section>
      </header>
      <main>
        <section className={styles.features} id="allies_orgs_enemies">
          <div>
            <label form="organizations">Allies, Organizations, &amp; Enemies</label><textarea
            className={styles.textarea}
            name="organizations" value={character.organizations}
            onChange={handleInputChange} onBlur={handleInputBlur}
          />
          </div>
        </section>
        <section className={styles.features} id="backstory">
          <div>
            <label form="backstory">Character Backstory</label><textarea className={styles.textarea} name="backstory"
                                                                         value={character.backstory}
                                                                         onChange={handleInputChange}
                                                                         onBlur={handleInputBlur}
          />
          </div>
        </section>
        <section>
          <section className={styles.flavor}>
            <div className={styles.personality}>
              <label form="personality">Personality</label><textarea className={styles.textarea} name="personality"
                                                                     value={character.personality}
                                                                     onChange={handleInputChange}
                                                                     onBlur={handleInputBlur}
            />
            </div>
            <div className={styles.ideals}>
              <label form="ideals">Ideals</label><textarea className={styles.textarea} name="ideals"
                                                           value={character.ideals} onChange={handleInputChange}
                                                           onBlur={handleInputBlur}/>
            </div>
            <div className={styles.bonds}>
              <label form="bonds">Bonds</label><textarea className={styles.textarea} name="bonds"
                                                         value={character.bonds} onChange={handleInputChange}
                                                         onBlur={handleInputBlur}/>
            </div>
            <div className={styles.flaws}>
              <label form="flaws">Flaws</label><textarea className={styles.textarea} name="flaws"
                                                         value={character.flaws} onChange={handleInputChange}
                                                         onBlur={handleInputBlur}/>
            </div>
          </section>
        </section>
      </main>
      <hr className={styles.pageborder}/>
      <main>
        <section className={styles.features} id="notes-left">
          <div>
            <label form="notes-l">Additional Notes</label><textarea className={styles.textarea} name="notes_left"
                                                                    value={character.notes_left}
                                                                    onChange={handleInputChange}
                                                                    onBlur={handleInputBlur}
          />
          </div>
        </section>
        <section className={styles.features} id="notes-center">
          <div>
            <label form="notes-c">Additional Notes</label><textarea className={styles.textarea} name="notes_center"
                                                                    value={character.notes_center}
                                                                    onChange={handleInputChange}
                                                                    onBlur={handleInputBlur}
          />
          </div>
        </section>
        <section className={styles.features} id="notes-right">
          <div>
            <label form="notes-r">Additional Notes</label><textarea className={styles.textarea} name="notes_right"
                                                                    value={character.notes_right}
                                                                    onChange={handleInputChange}
                                                                    onBlur={handleInputBlur}
          />
          </div>
        </section>
      </main>
      <main>
        <input name="rows_attacks" type="hidden" defaultValue={2} value={character.rows_attacks}
               onChange={handleInputChange} onBlur={handleInputBlur}/>
        <input name="rows_attunements" type="hidden" defaultValue={3} value={character.rows_attunements}
               onChange={handleInputChange} onBlur={handleInputBlur}/>
        <input name="rows_inventory" type="hidden" defaultValue={2} value={character.rows_inventory}
               onChange={handleInputChange} onBlur={handleInputBlur}/>
        <input name="rows_spells" type="hidden" defaultValue={2} value={character.rows_spells}
               onChange={handleInputChange} onBlur={handleInputBlur}/>
      </main>
    </form>
  )
}

export default CharacterSheet
