import styles from "@/styles/CharacterSheet.module.css"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getExampleCharacter} from "@/5eReference/characterSheetGenerators";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {onUpdateCharacterSheet, onUpdateToken} from "@/graphql/subscriptions";
import * as mutations from "@/graphql/mutations";
import {updateCharacterSheet} from "@/graphql/mutations";
import {getCharacterSheet, getGame} from "@/graphql/queries";
import {DiceRoller} from "@dice-roller/rpg-dice-roller";
import useBattlemapStore from "@/stores/battlemapStore";
import * as PropTypes from "prop-types";
import {BsGear} from "react-icons/bs";

const scoreToMod = (score) => {
  return Math.floor((Number(score) - 10) / 2)
}

const AbilityScoreComponent = ({abilityName, score, rollCheck, handleInputChange, handleInputBlur}) => {
  const scoreField = `${abilityName.toLowerCase()}_score`
  return <li>
    <div className={styles.score}>
      <label className={styles.labelButton} form={abilityName}
             onClick={() => rollCheck(abilityName, scoreToMod(score))}>
        {abilityName}
      </label><input key={`${abilityName}_input`} name={scoreField} placeholder={"10"}
                     value={score}
                     onChange={handleInputChange}
                     onBlur={handleInputBlur}
                     className={styles.stat}
                     type="text"/>
    </div>
    <div className={styles.modifier}>
      <input name={`mod`} placeholder={"+0"} className={styles.statmod}
             value={scoreToMod(score)} readOnly={true}/>
    </div>
  </li>
}

const SaveSkillComponent = ({
                              checkName,
                              checkScore,
                              checkProf,
                              isSave,
                              rollCheck,
                              handleInputChange,
                              handleInputBlur,
                              handleCheckboxClick
                            }) => {

  const modField = isSave ? `${checkName.toLowerCase().replaceAll(" ", "_")}_save_mod` : `${checkName.toLowerCase().replaceAll(" ", "_")}_mod`
  const profField = isSave ? `${checkName.toLowerCase().replaceAll(" ", "_")}_save_prof` : `${checkName.toLowerCase().replaceAll(" ", "_")}_prof`

  return <li>
    <label form={checkName} className={styles.labelButton}
           onClick={() => rollCheck(isSave ? `${checkName} Save` : checkName, checkScore)}>
      {checkName}
    </label>
    <input name={modField}
           placeholder={"+0"}
           type="text"
           value={checkScore}
           onChange={handleInputChange}
           onBlur={handleInputBlur}/>
    <input name={profField} type="checkbox" onChange={handleCheckboxClick}
           checked={checkProf}/>
  </li>;
}

function Skills(props) {
  return <ul>
    <SaveSkillComponent checkName="Acrobatics" checkScore={props.character.acrobatics_mod}
                        checkProf={props.character.acrobatics_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Animal Handling" checkScore={props.character.animal_handling_mod}
                        checkProf={props.character.animal_handling_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Arcana" checkScore={props.character.arcana_mod}
                        checkProf={props.character.arcana_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Athletics" checkScore={props.character.athletics_mod}
                        checkProf={props.character.athletics_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Deception" checkScore={props.character.deception_mod}
                        checkProf={props.character.deception_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="History" checkScore={props.character.history_mod}
                        checkProf={props.character.history_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Insight" checkScore={props.character.insight_mod}
                        checkProf={props.character.insight_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Intimidation" checkScore={props.character.intimidation_mod}
                        checkProf={props.character.intimidation_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Investigation" checkScore={props.character.investigation_mod}
                        checkProf={props.character.investigation_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Medicine" checkScore={props.character.medicine_mod}
                        checkProf={props.character.medicine_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Nature" checkScore={props.character.nature_mod}
                        checkProf={props.character.nature_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Perception" checkScore={props.character.perception_mod}
                        checkProf={props.character.perception_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Performance" checkScore={props.character.performance_mod}
                        checkProf={props.character.performance_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Persuasion" checkScore={props.character.persuasion_mod}
                        checkProf={props.character.persuasion_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Religion" checkScore={props.character.religion_mod}
                        checkProf={props.character.religion_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Sleight of Hand" checkScore={props.character.sleight_of_hand_mod}
                        checkProf={props.character.sleight_of_hand_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Stealth" checkScore={props.character.stealth_mod}
                        checkProf={props.character.stealth_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
    <SaveSkillComponent checkName="Survival" checkScore={props.character.survival_mod}
                        checkProf={props.character.survival_prof} isSave={false} rollCheck={props.rollCheck}
                        handleInputChange={props.handleInputChange}
                        handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
  </ul>;
}

function Saves(props) {
  return (
    <div className={"saves " + styles.listSection + " " + styles.box}>
      <ul>
        <SaveSkillComponent checkName="Strength" checkScore={props.character.strength_save_mod}
                            checkProf={props.character.strength_save_prof} isSave={true} rollCheck={props.rollCheck}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
        <SaveSkillComponent checkName="Dexterity" checkScore={props.character.dexterity_save_mod}
                            checkProf={props.character.dexterity_save_prof} isSave={true} rollCheck={props.rollCheck}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
        <SaveSkillComponent checkName="Constitution" checkScore={props.character.constitution_save_mod}
                            checkProf={props.character.constitution_save_prof} isSave={true} rollCheck={props.rollCheck}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
        <SaveSkillComponent checkName="Intelligence" checkScore={props.character.intelligence_save_mod}
                            checkProf={props.character.intelligence_save_prof} isSave={true} rollCheck={props.rollCheck}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
        <SaveSkillComponent checkName="Wisdom" checkScore={props.character.wisdom_save_mod}
                            checkProf={props.character.wisdom_save_prof} isSave={true} rollCheck={props.rollCheck}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
        <SaveSkillComponent checkName="Charisma" checkScore={props.character.charisma_save_mod}
                            checkProf={props.character.charisma_save_prof} isSave={true} rollCheck={props.rollCheck}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
      </ul>
      <div className={styles.label}>
        Saving Throws
      </div>
    </div>
  )
}

function AbilityScores(props) {
  return <ul>
    <AbilityScoreComponent abilityName={"Strength"} score={props.character.strength_score}
                           rollCheck={props.rollCheck} handleInputChange={props.handleInputChange}
                           handleInputBlur={props.handleInputBlur}/>
    <AbilityScoreComponent abilityName={"Dexterity"} score={props.character.dexterity_score}
                           rollCheck={props.rollCheck} handleInputChange={props.handleInputChange}
                           handleInputBlur={props.handleInputBlur}/>
    <AbilityScoreComponent abilityName={"Constitution"}
                           score={props.character.constitution_score} rollCheck={props.rollCheck}
                           handleInputChange={props.handleInputChange} handleInputBlur={props.handleInputBlur}/>
    <AbilityScoreComponent abilityName={"Intelligence"}
                           score={props.character.intelligence_score} rollCheck={props.rollCheck}
                           handleInputChange={props.handleInputChange} handleInputBlur={props.handleInputBlur}/>
    <AbilityScoreComponent abilityName={"Wisdom"} score={props.character.wisdom_score}
                           rollCheck={props.rollCheck} handleInputChange={props.handleInputChange}
                           handleInputBlur={props.handleInputBlur}/>
    <AbilityScoreComponent abilityName={"Charisma"} score={props.character.charisma_score}
                           rollCheck={props.rollCheck} handleInputChange={props.handleInputChange}
                           handleInputBlur={props.handleInputBlur}/>
  </ul>;
}

function AttackList(props) {
  return <header>
    <section className={styles.attacksandspellcasting}>
      <div>
        <label>Attacks &amp; Spellcasting</label>
        <div>
          <div className={styles.labelRow}>
            <div className={styles.itemLabel} style={{width: "20%", paddingLeft: "10px"}}> Name</div>
            <div style={{width: "15%", paddingLeft: "10px"}}> Attack Bonus</div>
            <div style={{width: "20%", paddingLeft: "10px"}}> Damage</div>
            <div style={{width: "45%", paddingLeft: "10px"}}> Notes</div>
            <div style={{width: "100px"}}></div>
          </div>
          {props.character.attacks.map(props.callbackfn)}
        </div>
        <span>
              <button className={styles.button} name="button-addattack" type="button" onClick={props.onClick}
                      style={{width: "20%"}}>Add New Attack</button>
            </span>
        <textarea className={styles.textarea} name="attack_notes" value={props.character.attack_notes}
                  onChange={props.onChange} onBlur={props.onBlur}/>
      </div>
    </section>
  </header>;
}

const AttackRow = ({
                     attack,
                     index,
                     rollAttack,
                     handleInputChange,
                     handleInputBlur,
                     handleDamageChange,
                     addDamage,
                     removeAttack
                   }) => {
  delete attack.__typename
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [numDamageDice, setNumDamageDice] = useState(0)


  const toggleForm = (e) => {
    // e.preventDefault()
    setIsFormOpen(!isFormOpen);
    console.log("Opening Attack Form")
  };

  // Function to handle confirming the form and closing it
  const handleConfirm = (e) => {
    console.log("Confirming attack changes")
    e.preventDefault()
    toggleForm();
    handleInputBlur();
  };

  // useEffect(() => {
  //   setNumDamageDice(attack.damage_dice.length)
  // }, [attack])


  return (
    <div className={styles.attackRow}>
      {/* Always visible labels */}
      <div className={styles.labelRow}>
        <label style={{width: "130px"}}
               className={styles.labelButton} onClick={() => rollAttack(attack)}>{attack.name}</label>
        <label className={styles.itemLabel} style={{paddingLeft: "20px", width: "120px"}}>{attack.attack_bonus}</label>
        <div style={{width: "515px"}}>
          {attack.damage.map((damage, index) => {
            if (index < 5) {
              return <label key={index} className={styles.itemLabel}
                            style={{paddingLeft: "0px"}}>{damage.damage_dice} {damage.damage_type} {index < attack.damage.length - 1 ? ' + ' : ''}</label>
            }
          })}
        </div>
        <button type="button" onClick={toggleForm} style={{float: "right"}}>{isFormOpen ? "Done" : "Edit"}</button>
      </div>

      {/* Form fields */}
      {isFormOpen && (
        <div className={styles.formRow}>
          <div>
            <label><b>Name: </b></label>
            <input
              type="text"
              name={`attacks[${index}].name`}
              value={attack.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Attack Bonus: </b></label>
            <input
              type="text"
              name={`attacks[${index}].attack_bonus`}
              value={attack.attack_bonus}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Damage: </b></label>
            <table>
              <thead>
              <tr>
                <th>Damage String</th>
                <th>Damage Type</th>
              </tr>
              </thead>
              <tbody>
              {attack.damage.map((damage, dIndex) => {
                return (
                  <tr key={dIndex}>
                    <td>
                      <input
                        type="text"
                        name={`attacks[${index}].damage[${dIndex}].damage_dice`}
                        value={damage.damage_dice}
                        onChange={handleDamageChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`attacks[${index}].damage[${dIndex}].damage_type`}
                        value={damage.damage_type}
                        onChange={handleDamageChange}
                      />
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <button className={styles.itemButton} type="button" onClick={() => addDamage(index)}>+</button>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <label><b>Notes: </b></label>
            <textarea
              name={`attacks[${index}].notes`}
              value={attack.notes}
              onChange={handleInputChange}
              style={{borderStyle: "solid", borderColor: "black", borderWidth: "1px", width: "100%"}}
            />
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <button className={styles.itemButton} type={"button"} onClick={handleConfirm} style={{width: "20%"}}>Confirm
            </button>
            <button className={styles.button} name="button-removeitem" type="button"
                    onClick={() => removeAttack(index)}
                    style={{width: "20%"}}>Remove Attack
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const SpellRow = ({spell, index, handleInputChange, handleInputBlur, handleCheckboxClick, addDamage, removeSpell}) => {
  delete spell.__typename
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [numDamageDice, setNumDamageDice] = useState(0)


  const toggleForm = (e) => {
    // e.preventDefault()
    setIsFormOpen(!isFormOpen);
    console.log("Opening Attack Form")
  };

  // Function to handle confirming the form and closing it
  const handleConfirm = (e) => {
    console.log("Confirming attack changes")
    e.preventDefault()
    toggleForm();
    handleInputBlur();
  };

  return (
    <div className={styles.attackRow}>

      <div className={styles.labelRow}>
        <input
          style={{width: "5%"}}
          name={`spells[${index}].prepared`}
          type="checkbox"
          onChange={handleCheckboxClick}
          checked={spell.prepared}
        />
        <label style={{width: "17%", paddingLeft: "50px", paddingRight: "10px"}}
               className={styles.labelButton}>{spell.name}</label>
        <label className={styles.itemLabel} style={{width: "9%"}}>{spell.level}</label>
        <label className={styles.itemLabel} style={{width: "17%"}}>{spell.range_shape}</label>
        <label className={styles.itemLabel} style={{width: "17%"}}>{spell.cast_time}</label>
        <label className={styles.itemLabel} style={{width: "20%"}}>{spell.duration}</label>
        <button className={styles.itemButton} type="button" onClick={toggleForm}>{isFormOpen ? "Done" : "Edit"}</button>
      </div>

      {/* Form fields */}
      {isFormOpen && (
        <div className={styles.formRow}>
          <div>
            <label><b>Name: </b></label>
            <input
              type="text"
              name={`spells[${index}].name`}
              value={spell.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Concentration: </b></label>
            <input
              name={`spells[${index}].is_concentration`}
              type="checkbox"
              onChange={handleCheckboxClick}
              checked={spell.is_concentration}
            />
          </div>
          <div>
            <label><b>Ritual: </b></label>
            <input
              name={`spells[${index}].is_ritual`}
              type="checkbox"
              onChange={handleCheckboxClick}
              checked={spell.is_ritual}
            />
          </div>
          <div>
            <label><b>Level: </b></label>
            <input
              type="number"
              min="0" max="9"
              name={`spells[${index}].level`}
              value={spell.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Cast Time: </b></label>
            <input
              type="text"
              name={`attacks[${index}].cast_time`}
              value={spell.cast_time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Range: </b></label>
            <input
              type="text"
              name={`attacks[${index}].range`}
              value={spell.range}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Duration: </b></label>
            <input
              type="text"
              name={`attacks[${index}].duration`}
              value={spell.duration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Save Ability: </b></label>
            <input
              type="text"
              name={`attacks[${index}].save_ability`}
              value={spell.save_ability}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Components: </b></label>
            <input
              type="text"
              name={`attacks[${index}].components`}
              value={spell.components}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Description: </b></label>
            <input
              type="text"
              name={`attacks[${index}].description`}
              value={spell.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Attack Bonus / Save DC: </b></label>
            <input
              type="number"
              name={`attacks[${index}].attack_save`}
              value={spell.attack_save}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Source: </b></label>
            <input
              type="text"
              name={`attacks[${index}].source`}
              value={spell.source}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><b>Damage: </b></label>
            <table>
              <thead>
              <tr>
                <th>Damage String</th>
                <th>Damage Type</th>
              </tr>
              </thead>
              <tbody>
              {spell.damage.map((damage, dIndex) => {
                return (
                  <tr key={dIndex}>
                    <td>
                      <input
                        type="text"
                        name={`spells[${index}].damage[${dIndex}].damage_dice`}
                        value={damage.damage_dice}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`spells[${index}].damage[${dIndex}].damage_type`}
                        value={damage.damage_type}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <button className={styles.itemButton} type="button" onClick={() => addDamage(index)}>+</button>
            <div style={{display: "flex", alignItems: "center"}}>

              <label><b>Description: </b></label>
              <textarea
                // className={styles.textarea}
                style={{
                  borderWidth: "1px",
                  solid: "#ccc",
                  borderStyle: "solid",
                  width: "100%"
                }}
                name={`spells[${index}].notes`}
                value={spell.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <button className={styles.itemButton} type={"button"} onClick={handleConfirm} style={{width: "20%"}}>Confirm
            </button>
            <button className={styles.itemButton} name="button-removeitem" type="button"
                    onClick={() => removeSpell(index)}
                    style={{width: "20%"}}>
              Remove Spell
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SpellList(props) {
  return <div>
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
              <td><input name="spell_slots_1" type="text" value={props.character.spell_slots_1}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_2" type="text" value={props.character.spell_slots_2}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_3" type="text" value={props.character.spell_slots_3}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_4" type="text" value={props.character.spell_slots_4}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_5" type="text" value={props.character.spell_slots_5}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_6" type="text" value={props.character.spell_slots_6}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_7" type="text" value={props.character.spell_slots_7}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_8" type="text" value={props.character.spell_slots_8}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_9" type="text" value={props.character.spell_slots_9}
                         onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
            </tr>
            <tr>
              <td>Maximum</td>
              <td><input name="spell_slots_max_1" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_1}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_2" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_2}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_3" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_3}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_4" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_4}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_5" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_5}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_6" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_6}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_7" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_7}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_8" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_8}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
              <td><input name="spell_slots_max_9" type="text" placeholder={"0"}
                         value={props.character.spell_slots_max_9}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.attacksandspellcasting} id="pactslots" style={{width: "20%"}}>
        <div>
          <label>Spell Points</label>
          <table>
            <tbody>
            <tr>
              <td>Available</td>
              <td><input name="sp_available" type="text" value={props.character.sp_available}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
            </tr>
            <tr>
              <td>Maximum</td>
              <td><input name="sp_maximum" type="text" placeholder={"0"} value={props.character.sp_maximum}
                         onChange={props.onChange} onBlur={props.onBlur}/></td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </header>
    <header>
      <section className={styles.attacksandspellcasting} id="spells">
        <div>
          <div className={styles.labelRow}>
            <div style={{width: "15%", paddingLeft: "10px"}}> Prepared</div>
            <div style={{width: "20%", paddingLeft: "10px"}}> Name</div>
            <div style={{width: "10%", paddingLeft: "10px"}}> Level</div>
            <div style={{width: "20%", paddingLeft: "10px"}}> Range</div>
            <div style={{width: "20%", paddingLeft: "10px"}}> Casting Time</div>
            <div style={{width: "20%", paddingLeft: "10px"}}> Duration</div>
            <div style={{width: "100px"}}></div>
          </div>
          {props.character.spells.map(props.callbackfn)}
        </div>
        <div>
          <span>
          <button className={styles.button} name="button-addspell" type="button" onClick={props.addSpell}
                  style={{width: "20%"}}>Add New Spell</button>
        </span>
          <textarea className={styles.textarea} name="spells_notes" placeholder="Additional spell notes"
                    value={props.character.spells_notes}
                    onChange={props.onChange} onBlur={props.onBlur}/>

        </div>
      </section>
    </header>
  </div>;
}

function Item(props) {
  delete props.item.__typename
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [numDamageDice, setNumDamageDice] = useState(0)


  const toggleForm = (e) => {
    // e.preventDefault()
    setIsFormOpen(!isFormOpen);
    console.log("Opening Attack Form")
  };

  return <div>
    <div className={styles.labelRow}>
      <input
        name={`inventory[${props.index}].equipped`}
        type="checkbox"
        style={{width: "5%", marginLeft: "35px"}}
        onChange={props.handleCheckboxClick}
        checked={props.item.equipped}
      />
      <label className={styles.itemLabel} style={{width: "28%", marginLeft: "32px"}}>{props.item.name}</label>
      <label className={styles.itemLabel} style={{width: "10%"}}>{props.item.count}</label>
      <label className={styles.itemLabel} style={{width: "10%"}}>{props.item.weight}</label>
      <label className={styles.itemLabel} style={{width: "10%"}}>{props.item.value}</label>
      <label className={styles.itemLabel} style={{width: "40%"}}>{props.item.notes}</label>
      <button type="button" onClick={toggleForm}>{isFormOpen ? "Done" : "Edit"}</button>
    </div>
    {/* Form fields */}
    {isFormOpen && (
      <div className={styles.formRow}>

        <label><b>Name: </b></label>
        <input
          name={`inventory[${props.index}].name`}
          type="text"
          value={props.item.name}
          onChange={props.handleInputChange}
          onBlur={props.onBlur}
        />

        <label><b>Count: </b></label>
        <input
          name={`inventory[${props.index}].count`}
          type="text"
          value={props.item.count}
          onChange={props.handleInputChange}
          onBlur={props.onBlur}
        />

        <label><b>Weight: </b></label>
        <input
          name={`inventory[${props.index}].weight`}
          type="text"
          value={props.item.weight}
          onChange={props.handleInputChange}
          onBlur={props.onBlur}
        />
        <label><b>Value: </b></label>
        <input
          name={`inventory[${props.index}].value`}
          type="text"
          value={props.item.value}
          onChange={props.handleInputChange}
          onBlur={props.onBlur}
        />

        <label><b>Notes: </b></label>
        <textarea
          // className={styles.textarea}
          style={{
            borderWidth: "1px",
            solid: "#ccc",
            borderStyle: "solid"
          }}
          name={`inventory[${props.index}].notes`}
          value={props.item.notes}
          onChange={props.handleInputChange}
          onBlur={props.onBlur}
        />
        <button className={styles.button} name="button-removeitem" type="button"
                onClick={() => props.removeInventory(props.index)}
                style={{width: "20%"}}>Remove Item
        </button>
      </div>
    )}
  </div>
}

function InventoryList(props) {
  return <div>
    <header>
      <section className={styles.encumberance} id="encumberancetable" style={{width: "30%"}}>
        <div>
          <label style={{order: 0, padding: "5px"}}>Encumberance</label>
          <div>
            <table>
              <tbody>
              <tr>
                <th>Weight Carried</th>
              </tr>
              <tr>
                <td><input name="weight_carried" id="weight_carried" placeholder={"0"}
                           value={props.character.weight_carried} onChange={props.onChange}
                           onBlur={props.onBlur}/>
                </td>
              </tr>
              <tr>
                <th>Weight Capacity</th>
              </tr>
              <tr>
                <td><input name="weight_capacity" placeholder={"0"} value={props.character.weight_capacity}
                           onChange={props.onChange} onBlur={props.onBlur}/></td>
              </tr>
              </tbody>
            </table>
            <textarea className={styles.textarea} name="encumberance_notes"
                      placeholder="Additional encumberance notes"
                      style={{height: "12em"}} value={props.character.encumberance_notes}
                      onChange={props.onChange} onBlur={props.onBlur}
            />
          </div>
        </div>
      </section>
      <section className={styles.currency} style={{width: "30%"}}>
        <div>
          <label style={{order: 0, padding: "5px"}}>Currency</label>
          <div className={styles.money}>
            <ul>
              <li>
                <label form="pp">pp</label><input name="pp" value={props.character.pp} onChange={props.onChange}
                                                  onBlur={props.onBlur}/>
              </li>
              <li>
                <label form="gp">gp</label><input name="gp" value={props.character.gp} onChange={props.onChange}
                                                  onBlur={props.onBlur}/>
              </li>
              <li>
                <label form="ep">ep</label><input name="ep" value={props.character.ep} onChange={props.onChange}
                                                  onBlur={props.onBlur}/>
              </li>
              <li>
                <label form="sp">sp</label><input name="sp" value={props.character.sp} onChange={props.onChange}
                                                  onBlur={props.onBlur}/>
              </li>
              <li>
                <label form="cp">cp</label><input name="cp" value={props.character.cp} onChange={props.onChange}
                                                  onBlur={props.onBlur}/>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.attacksandspellcasting} id="attunement">
        <div>
          <label style={{order: 0, padding: "5px"}}>Attunement</label>
          <table>
            <thead>
            <tr>
              <th>Attuned Magic Items</th>
            </tr>
            </thead>
            <tbody id="attunementtable">
            <tr>
              <td><input name="attunement0" type="text" value={props.character.attunement0} onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
            </tr>
            <tr>
              <td><input name="attunement1" type="text" value={props.character.attunement1} onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
            </tr>
            <tr>
              <td><input name="attunement2" type="text" value={props.character.attunement2} onChange={props.onChange}
                         onBlur={props.onBlur}/></td>
            </tr>
            </tbody>
          </table>
          <span>
          <button className={styles.button} name="button-addattunement" type="button" onClick={props.onClick}
                  style={{width: "45%"}}>Add Attunement Slot</button>
          <button className={styles.button} name="button-removeattunement" type="button"
                  onClick={props.onClick1}
                  style={{width: "45%"}}>Remove Attunement Slot</button>
        </span>
          <textarea className={styles.textarea} name="attunement_notes" placeholder="Additional attunement notes"
                    value={props.character.attunement_notes}
                    onChange={props.onChange} onBlur={props.onBlur}
          />
        </div>
      </section>
    </header>
    <header>
      <section className={styles.attacksandspellcasting} id="inventory">
        <div>
          <label>Inventory</label>
          <div className={styles.labelRow}>
            <div className={styles.itemLabel} style={{width: "15%", paddingLeft: "10px"}}> Equipped</div>
            <div style={{width: "30%", paddingLeft: "10px"}}> Name</div>
            <div style={{width: "10%", paddingLeft: "10px"}}> Count</div>
            <div style={{width: "10%", paddingLeft: "10px"}}> Weight</div>
            <div style={{width: "10%", paddingLeft: "10px"}}> Value</div>
            <div style={{width: "40%", paddingLeft: "10px"}}> Notes</div>
            <div style={{width: "100px"}}></div>
          </div>
          {props.character.inventory.map(props.callbackfn)}
          <span>
            <button className={styles.button} name="button-additem" type="button" onClick={props.addInventory}
                    style={{width: "20%"}}>Add New Item</button>
          </span>
          <textarea className={styles.textarea} name="inventory_notes" placeholder="Additional inventory notes"
                    value={props.character.inventory_notes}
                    onChange={props.onChange} onBlur={props.onBlur}
          />
        </div>
      </section>
    </header>
  </div>;
}

function Features(props) {
  return <main>
    <section className={styles.features} id="features_left">
      <div>
        <label form="features-l">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                name="features_left"
                                                                                value={props.character.features_left}
                                                                                onChange={props.onChange}
                                                                                onBlur={props.onBlur}
      />
      </div>
    </section>
    <section className={styles.features} id="features_center">
      <div>
        <label form="features-c">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                name="features_center"
                                                                                value={props.character.features_center}
                                                                                onChange={props.onChange}
                                                                                onBlur={props.onBlur}
      />
      </div>
    </section>
    <section className={styles.features} id="features_right">
      <div>
        <label form="features-r">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                name="features_right"
                                                                                value={props.character.features_right}
                                                                                onChange={props.onChange}
                                                                                onBlur={props.onBlur}
      />
      </div>
    </section>
  </main>;
}

function CharacterDetails(props) {
  return <header>
    <section className={styles.misc} id="misc-desc">
      <ul>
        <li>
          <label form="gender">Gender</label><input name="gender" placeholder="Gender" value={props.character.gender}
                                                    onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="age">Age</label><input name="age" placeholder="Age" value={props.character.age}
                                              onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="height">Height</label><input name="height" placeholder="Height" value={props.character.height}
                                                    onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="weight">Weight</label><input name="weight" placeholder="Weight" value={props.character.weight}
                                                    onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="faith">Faith</label><input name="faith" placeholder="Faith" value={props.character.faith}
                                                  onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="skin">Skin</label><input name="skin" placeholder="Skin" value={props.character.skin}
                                                onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="eyes">Eyes</label><input name="eyes" placeholder="Eyes" value={props.character.eyes}
                                                onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="hair">Hair</label><input name="hair" placeholder="Hair" value={props.character.hair}
                                                onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
      </ul>
    </section>
  </header>;
}

function Notes(props) {
  return <main>
    <section className={styles.features} id="notes-left">
      <div>
        <label form="notes-l">Additional Notes</label><textarea className={styles.textarea} name="notes_left"
                                                                value={props.character.notes_left}
                                                                onChange={props.onChange}
                                                                onBlur={props.onBlur}
      />
      </div>
    </section>
    <section className={styles.features} id="notes-center">
      <div>
        <label form="notes-c">Additional Notes</label><textarea className={styles.textarea} name="notes_center"
                                                                value={props.character.notes_center}
                                                                onChange={props.onChange}
                                                                onBlur={props.onBlur}
      />
      </div>
    </section>
    <section className={styles.features} id="notes-right">
      <div>
        <label form="notes-r">Additional Notes</label><textarea className={styles.textarea} name="notes_right"
                                                                value={props.character.notes_right}
                                                                onChange={props.onChange}
                                                                onBlur={props.onBlur}
      />
      </div>
    </section>
  </main>;
}

function CombatValues(props) {
  return <section>
    <section className={styles.combat}>
      <div className={styles.armorclass}>
        <div>
          <label form="ac">Armor Class</label><input name="ac" placeholder={"10"} type="text"
                                                     value={props.character.ac}
                                                     onChange={props.onChange} onBlur={props.onBlur}/>
        </div>
      </div>
      <div className={styles.initiative}>
        <div>
          <label form="initiative">Initiative</label><input name="initiative" placeholder={"+0"} type="text"
                                                            value={props.character.initiative}
                                                            onChange={props.onChange}
                                                            onBlur={props.onBlur}/>
        </div>
      </div>
      <div className={styles.speed}>
        <div>
          <label form="speed">Speed</label><input name="speed" placeholder="30ft" type="text"
                                                  value={props.character.speed} onChange={props.onChange}
                                                  onBlur={props.onBlur}/>
        </div>
      </div>
      <div className={styles.armorclass}>
        <div>
          <label form="current_hp">Current Hit Points</label><input name="current_hp" placeholder={"10"}
                                                                    value={props.character.current_hp}
                                                                    onChange={props.onChange}
                                                                    onBlur={props.onBlur}
                                                                    type="text"/>
        </div>
      </div>
      <div className={styles.initiative}>
        <div>
          <label form="max_hp">Hit Point Maximum</label><input name="max_hp" placeholder={"10"} type="text"
                                                               value={props.character.max_hp}
                                                               onChange={props.onChange}
                                                               onBlur={props.onBlur}/>
        </div>
      </div>
      <div className={styles.speed}>
        <div>
          <label form="temp_hp">Temporary Hit Points</label><input name="temp_hp" placeholder={"0"} type="text"
                                                                   value={props.character.temp_hp}
                                                                   onChange={props.onChange}
                                                                   onBlur={props.onBlur}/>
        </div>
      </div>
      <div className={styles.hitdice}>
        <div>
          <div className={styles.total}>
            <label form="total_hd">Total</label><input name="total_hd" placeholder="_d__" type="text"
                                                       value={props.character.total_hd} onChange={props.onChange}
                                                       onBlur={props.onBlur}/>
          </div>
          <div className={styles.remaining}>
            <label form="current_hd">Hit Dice</label><input name="current_hd" type="text"
                                                            value={props.character.current_hd}
                                                            onChange={props.onChange}
                                                            onBlur={props.onBlur}/>
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
                <input name="death_success_1" type="checkbox" onChange={props.onChange1}
                       checked={props.character.death_success_1}/>
                <input name="death_success_2" type="checkbox" onChange={props.onChange1}
                       checked={props.character.death_success_2}/>
                <input name="death_success_3" type="checkbox" onChange={props.onChange1}
                       checked={props.character.death_success_3}/>
              </div>
            </div>
            <div className={styles.deathfails}>
              <label>Failures</label>
              <div className={styles.bubbles}>
                <input name="death_fail_1" type="checkbox" onChange={props.onChange1}
                       checked={props.character.death_fail_1}/>
                <input name="death_fail_2" type="checkbox" onChange={props.onChange1}
                       checked={props.character.death_fail_2}/>
                <input name="death_fail_3" type="checkbox" onChange={props.onChange1}
                       checked={props.character.death_fail_3}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className={styles.otherprofs + " " + styles.box + " " + styles.textblock}>
      <label form="other_profs">Other Proficiencies and Languages</label><textarea className={styles.textarea}
                                                                                   name="other_profs"
                                                                                   value={props.character.other_profs}
                                                                                   onChange={props.onChange}
                                                                                   onBlur={props.onBlur}/>
    </div>
  </section>;
}

function Attributes(props) {
  return <section>
    <section className={styles.flavor}>
      <div className={styles.personality}>
        <label form="defenses">Defenses &amp; Active Conditions</label><textarea className={styles.textarea}
                                                                                 name="defenses"
                                                                                 value={props.character.defenses}
                                                                                 onChange={props.onChange}
                                                                                 onBlur={props.onBlur}/>
      </div>
      <div className={styles.ideals}>
        <label form="save_notes">Saving Throw Notes</label><textarea className={styles.textarea}
                                                                     name="save_notes"
                                                                     value={props.character.save_notes}
                                                                     onChange={props.onChange}
                                                                     onBlur={props.onBlur}/>
      </div>
      <div className={styles.bonds}>
        <label form="movement">Movement Speeds</label><textarea className={styles.textarea} name="movement"
                                                                value={props.character.movement}
                                                                onChange={props.onChange}
                                                                onBlur={props.onBlur}/>
      </div>
      <div className={styles.flaws}>
        <label form="senses">Senses</label><textarea className={styles.textarea} name="senses"
                                                     value={props.character.senses} onChange={props.onChange}
                                                     onBlur={props.onBlur}/>
      </div>
    </section>
    <div className={styles.passivePerception + " " + styles.box}>
      <div className={styles.labelContainer}>
        <label form="passive_perception">Passive Wisdom (Perception)</label>
      </div>
      <input name="passive_perception" placeholder={"10"} value={props.character.passive_perception}
             onChange={props.onChange} onBlur={props.onBlur}/>
    </div>
    <div className={styles.passivePerception + " " + styles.box}>
      <div className={styles.labelContainer}>
        <label form="passive_insight">Passive Wisdom (Insight)</label>
      </div>
      <input name="passive_insight" placeholder={"10"} value={props.character.passive_insight}
             onChange={props.onChange} onBlur={props.onBlur}/>
    </div>
    <div className={styles.passivePerception + " " + styles.box}>
      <div className={styles.labelContainer}>
        <label form="passive_investigation">Passive Intelligence (Investigation)</label>
      </div>
      <input name="passive_investigation" placeholder={"10"} value={props.character.passive_investigation}
             onChange={props.onChange} onBlur={props.onBlur}/>
    </div>
  </section>;
}

function Personality(props) {
  return <main>
    <section className={styles.features} id="allies_orgs_enemies">
      <div>
        <label form="organizations">Allies, Organizations, &amp; Enemies</label><textarea
        className={styles.textarea}
        name="organizations" value={props.character.organizations}
        onChange={props.onChange} onBlur={props.onBlur}
      />
      </div>
    </section>
    <section className={styles.features} id="backstory">
      <div>
        <label form="backstory">Character Backstory</label><textarea className={styles.textarea} name="backstory"
                                                                     value={props.character.backstory}
                                                                     onChange={props.onChange}
                                                                     onBlur={props.onBlur}
      />
      </div>
    </section>
    <section>
      <section className={styles.flavor}>
        <div className={styles.personality}>
          <label form="personality">Personality</label><textarea className={styles.textarea} name="personality"
                                                                 value={props.character.personality}
                                                                 onChange={props.onChange}
                                                                 onBlur={props.onBlur}
        />
        </div>
        <div className={styles.ideals}>
          <label form="ideals">Ideals</label><textarea className={styles.textarea} name="ideals"
                                                       value={props.character.ideals} onChange={props.onChange}
                                                       onBlur={props.onBlur}/>
        </div>
        <div className={styles.bonds}>
          <label form="bonds">Bonds</label><textarea className={styles.textarea} name="bonds"
                                                     value={props.character.bonds} onChange={props.onChange}
                                                     onBlur={props.onBlur}/>
        </div>
        <div className={styles.flaws}>
          <label form="flaws">Flaws</label><textarea className={styles.textarea} name="flaws"
                                                     value={props.character.flaws} onChange={props.onChange}
                                                     onBlur={props.onBlur}/>
        </div>
      </section>
    </section>
  </main>;
}

function NameBackground(props) {
  return <header>
    <section className={styles.charname}>
      <label form="name">Character Name</label><input name="name" id="name"
                                                      value={props.character.name}
                                                      onChange={props.onChange}
                                                      onBlur={props.onBlur}
                                                      placeholder="Character Name"/>
    </section>
    <section className={styles.misc}>
      <ul>
        <li>
          <label form="class_level">Class &amp; Level</label><input name="class_level" placeholder="Class 1"
                                                                    value={props.character.class_level}
                                                                    onChange={props.onChange}
                                                                    onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="background">Background</label><input name="background" placeholder="Background"
                                                            value={props.character.background}
                                                            onChange={props.onChange}
                                                            onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="player_name">Player Name</label><input name="player_name" placeholder="Player Name"
                                                              value={props.character.player_name}
                                                              onChange={props.onChange}
                                                              onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="race">Race</label><input name="race" placeholder="Race" value={props.character.race}
                                                onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="alignment">Alignment</label><input name="alignment" placeholder="Alignment"
                                                          value={props.character.alignment} onChange={props.onChange}
                                                          onBlur={props.onBlur}/>
        </li>
        <li>
          <label form="xp">Experience Points</label><input name="xp" placeholder={"0"} value={props.character.xp}
                                                           onChange={props.onChange} onBlur={props.onBlur}/>
        </li>
      </ul>
    </section>
  </header>;
}

function Modifiers(props) {
  return <section>
    <section className={styles.attributes}>
      <div className={styles.scores}>
        <AbilityScores character={props.character} rollCheck={props.rollCheck}
                       handleInputChange={props.handleInputChange} handleInputBlur={props.handleInputBlur}/>
      </div>
      <div>
        <div className={styles.proficiencybonus + " " + styles.box}>
          <div className={styles.labelContainer}>
            <label form="inspiration">Inspiration</label>
          </div>
          <input name="inspiration" value={props.character.inspiration} onChange={props.handleInputChange}
                 onBlur={props.handleInputBlur}/>
        </div>
        <div className={styles.proficiencybonus + " " + styles.box}>
          <div className={styles.labelContainer}>
            <label form="proficiencybonus">Proficiency Bonus</label>
          </div>
          <input name="proficiency_bonus" placeholder={"+2"} value={props.character.proficiency_bonus}
                 onChange={props.handleInputChange} onBlur={props.handleInputBlur}/>
        </div>
        <Saves character={props.character} rollCheck={props.rollCheck} handleInputChange={props.handleInputChange}
               handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>

        <div className={styles.skills + " " + styles.listSection + " " + styles.box}>
          <Skills character={props.character} rollCheck={props.rollCheck} handleInputChange={props.handleInputChange}
                  handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}/>
          <div className={styles.label}>
            Skills
          </div>
        </div>
      </div>
    </section>
  </section>;
}

const CharacterSheet = ({characterSheetInput}) => {

  const gameID = useBattlemapStore((state) => state.gameID)
  const playerID = useBattlemapStore((state) => state.playerID)

  const [character, setCharacter] = useState(null);
  const [characterPreUpdate, setCharacterPreUpdate] = useState({});

  const {register, setValue, handleSubmit} = useForm();

  // Load character sheet values into form inputs on component mount
  useEffect(() => {
    console.log(characterSheetInput)
    const initializeCharacter = async () => {
      const sheetReq = await API.graphql({
        query: getCharacterSheet,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {id: characterSheetInput.id}
      });
      const fetchSheet = {...sheetReq.data.getCharacterSheet}
      delete fetchSheet.game
      delete fetchSheet.__typename
      delete fetchSheet.createdAt
      delete fetchSheet.token
      delete fetchSheet.updatedAt
      console.log(sheetReq)
      setCharacter(fetchSheet)
      Object.keys(fetchSheet).forEach((fieldName) => {
        setValue(fieldName, fetchSheet[fieldName]);
      });
    }
    initializeCharacter()
    // Iterate over the character sheet properties and set their values in the form
  }, []);

  // Separate subscription functions
  const subscribeToSheetUpdate = () => {
    const subscriptionHandler = (data) => {
      const updatedSheet = data.value.data.onUpdateCharacterSheet
      console.log('Current Sheet:', character)
      console.log('Updated Sheet from Subscription:', updatedSheet)
      if (character.id === updatedSheet.id) {
        setCharacter(updatedSheet)
      }
      // console.log(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
      // setMapTokens(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
    };

    const subscription = API.graphql(
      graphqlOperation(onUpdateCharacterSheet, {id: characterSheetInput.id}),
      {
        filter: {
          mutationType: {
            eq: 'update',
          },
        },
      }
    ).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error('Subscription Error:', error);
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };


  useEffect(() => {
    if (!character) return
    const unsubscribeToSheetUpdate = subscribeToSheetUpdate()

    return () => {
      unsubscribeToSheetUpdate()
    }
  }, [character])

  const updateBackendSheet = async () => {
    console.log("Updating Backend Sheet")
    console.log(characterPreUpdate)
    setCharacterPreUpdate({...characterPreUpdate, id: character.id})
  }

  useEffect(() => {
    const sendSheetUpdate = async () => {
      function removeTypename(obj) {
        for (const prop in obj) {
          if (prop === '__typename')
            delete obj[prop];
          else if (typeof obj[prop] === 'object')
            removeTypename(obj[prop]);
        }
      }

      console.log("Updates to be pushed to backend:")
      console.log(characterPreUpdate)

      const input = {...characterPreUpdate}
      removeTypename(input)
      try {
        const updatedToken = await API.graphql({
          query: mutations.updateCharacterSheet,
          variables: {input: input}
        })
        console.log(updatedToken)
      } catch (err) {
        console.log(err)
      } finally {
        setCharacterPreUpdate({})
      }
    }
    console.log("Character pre update changed")
    console.log(characterPreUpdate)
    if (characterPreUpdate.id) {
      sendSheetUpdate()
    }
  }, [characterPreUpdate])

  const handleInputChange = (e) => {
    const separateString = (inputString) => {
      const regex = /([^\[\].]+)\[(\d+)\]\.([^\[\].]+)/;
      const matches = inputString.match(regex);
      if (matches) {
        const [, object, index, property] = matches;
        return [object, parseInt(index), property];
      }
      return null;
    }

    let {name, value} = e.target;
    // console.log(name, value)
    const chunkString = separateString(name)
    if (chunkString) {
      const target = chunkString[0]
      const index = chunkString[1]
      const property = chunkString[2]

      // Create an intermediate object for the innermost property to update
      const updatedNestedProperty = {...character[target][index], [property]: value};

      // Create an intermediate object for the inner array to update
      const updatedInnerArray = [...character[target]];
      updatedInnerArray[index] = updatedNestedProperty;

      // Create the final updated character object with the updated array
      const updatedCharacter = {...character, [target]: updatedInnerArray};

      setCharacter(updatedCharacter);
      setCharacterPreUpdate({...characterPreUpdate, [target]: updatedInnerArray});
    } else {
      setCharacter({...character, [name]: value})
      setCharacterPreUpdate({...characterPreUpdate, [name]: value})
    }
  }

  const handleDamageChange = (e) => {
    const separateString = (inputString) => {
      const diceRegex = /attacks\[(\d+)\]\.damage\[(\d+)\]\.damage_dice/;
      const diceMatches = inputString.match(diceRegex);
      if (diceMatches) {
        const characterCopy = {...character}
        characterCopy.attacks[diceMatches[1]].damage[diceMatches[2]].damage_dice = e.target.value
        setCharacter({...character, attacks: characterCopy.attacks});
        setCharacterPreUpdate({...characterPreUpdate, attacks: characterCopy.attacks});
        return
      }

      const typeRegex = /attacks\[(\d+)\]\.damage\[(\d+)\]\.damage_type/;
      const typeMatches = inputString.match(typeRegex);
      if (typeMatches) {
        const characterCopy = {...character}
        characterCopy.attacks[typeMatches[1]].damage[typeMatches[2]].damage_type = e.target.value
        setCharacter({...character, attacks: characterCopy.attacks});
        setCharacterPreUpdate({...characterPreUpdate, attacks: characterCopy.attacks});
        return
      }

      return null;
    }

    let {name, value} = e.target;
    // console.log(name, value)
    const chunkString = separateString(name)
  }
  const handleInputBlur = async () => {
    // Perform backend update here
    // You can access the updated character sheet using 'editableCharacterSheet'
    console.log("Handling input blur")
    console.log(characterPreUpdate)
    if (Object.keys(characterPreUpdate).length > 0) {
      console.log('Sending update to the backend after input blur');
      updateBackendSheet()
    }
  };

  const handleCheckboxClick = (e) => {
    setCharacterPreUpdate({...characterPreUpdate, [e.target.name]: !character[e.target.name], id: character.id})
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

  const removeAttack = async (index) => {
    console.log("Removing attack ", index)
    let newAttacks = [...character.attacks]
    newAttacks.splice(index, 1)
    await setCharacterPreUpdate({
      ...characterPreUpdate,
      attacks: newAttacks,
      id: character.id
    })
    handleInputBlur()
  }

  const removeSpell = (index) => {
    setCharacterPreUpdate({
      spells: [...character.spells].splice(index, 1),
      id: character.id
    })
    handleInputBlur()
  }

  const removeInventory = (index) => {
    setCharacterPreUpdate({
      inventory: [...character.inventory].splice(index, 1),
      id: character.id
    })
    handleInputBlur()
  }

  const removeLastRow = () => {
    return null
  }

  const addSpell = () => {
    setCharacter({
      ...character,
      spells: character.spells.concat({
        is_prepared: false,
        is_concentration: false,
        is_ritual: false,
        is_attack: false,
        name: "",
        level: 0,
        source: "",
        save_ability: "None",
        attack_save: 0,
        damage: [],
        cast_time: "1 action",
        range_shape: "Self",
        duration: "Instantaneous",
        components: "V, S",
        notes: ""
      })
    })
    // updateBackendSheet()
  }

  const addAttunement = () => {
    return null
  }

  const addAttack = () => {
    setCharacterPreUpdate({
      ...characterPreUpdate,
      attacks: character.attacks.concat({
        name: "",
        notes: "",
        attack_bonus: 0,
        damage: [{damage_dice: "", damage_type: ""}]
      }),
      id: character.id
    })
    handleInputBlur()
  }

  const addAttackDamage = async (attackIndex) => {
    console.log(`Adding damage to attack ${attackIndex}`);
    const postDamageAttacks = character.attacks.map((attack, index) => {
      if (index === attackIndex) {
        console.log("Found matching index");
        const newDamage = [...attack.damage, {damage_dice: "1d4", damage_type: "Piercing"}];
        console.log(newDamage);
        return {...attack, damage: newDamage};
      }
      return attack;
    });
    // Manually add the id to the characterPreUpdate so it will auto update the backend without a race condition for handleInputBlur()
    setCharacterPreUpdate({...characterPreUpdate, attacks: postDamageAttacks, id: character.id});
  };

  const addSpellDamage = async (spellIndex) => {
    console.log(`Adding damage to attack ${spellIndex}`);
    const postDamageSpells = character.spells.map((spells, index) => {
      if (index === spellIndex) {
        console.log("Found matching index");
        const newDamage = [...spells.damage, {damage_dice: "1d4", damage_type: "Piercing"}];
        console.log(newDamage);
        return {...spells, damage: newDamage};
      }
      return spells;
    });
    // Manually add the id to the characterPreUpdate so it will auto update the backend without a race condition for handleInputBlur()
    setCharacterPreUpdate({...characterPreUpdate, spells: postDamageSpells, id: character.id});
  };

  const longRest = () => {
    return null
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  const rollCheck = async (name, d20mod) => {
    // Prevent the page from reloading
    const input = {
      messageType: "CHECK",
      abilityName: name,
      d20mod: d20mod,
      owner: playerID,
      gameMessageListId: gameID
    };
    // Call the createNewGame mutation
    const response = await API.graphql({
      query: `
        mutation ParseMessage($input: ParseMessageInput!) {
          parseMessage(input: $input) {
            id
          }
        }
      `,
      variables: {
        input
      },
    });
  }

  // Remember to eventually refactor to allow damage dice arrays rather than just one
  const rollAttack = async (attack) => {
    console.log("Rolling Attack")
    console.log(attack)
    // Prevent the page from reloading
    const convertedDamage = attack.damage.map((dice) => {
      return {diceString: dice.damage_dice, damageType: dice.damage_type}
    })
    const input = {
      messageType: "ATTACK",
      abilityName: attack.name,
      d20mod: attack.attack_bonus,
      damageDice: convertedDamage,
      messageText: attack.notes,
      owner: playerID,
      gameMessageListId: gameID
    };
    // Call the createNewGame mutation
    const response = await API.graphql({
      query: `
        mutation ParseMessage($input: ParseMessageInput!) {
          parseMessage(input: $input) {
            id
          }
        }
      `,
      variables: {
        input
      },
    });
    console.log("Attack response")
    console.log(attack)
  }

  if (character) {
    return (
      <form className={styles.charsheet} id="charsheet">
        <NameBackground character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
        <main>
          <Modifiers key={"Charisma"} character={character} rollCheck={rollCheck} handleInputChange={handleInputChange}
                     handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}/>
          <CombatValues character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                        onChange1={handleCheckboxClick}/>
          <Attributes character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
        </main>
        <AttackList character={character} callbackfn={(attack, index) => (
          <AttackRow
            key={index}
            attack={attack}
            index={index}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleDamageChange={handleDamageChange}
            rollAttack={rollAttack}
            addDamage={addAttackDamage}
            removeAttack={removeAttack}
          />
        )} onClick={addAttack} onClick1={removeLastRow('attacktable')} onChange={handleInputChange}
                    onBlur={handleInputBlur}/>
        <hr className={styles.pageborder}/>
        <SpellList character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                   callbackfn={(attack, index) => (
                     <SpellRow key={index} spell={attack} index={index} handleInputChange={handleInputChange}
                               handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}
                               addDamage={addSpellDamage} removeSpell={removeSpell}/>
                   )} addSpell={addSpell} onClick1={removeLastRow('spelltable')}/>
        <hr className={styles.pageborder}/>
        <InventoryList character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                       handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}
                       onClick={addAttunement} onClick1={removeLastRow('attunementtable')}
                       addInventory={addInventory} removeInventory={removeInventory} callbackfn={(item, index) => (
          <Item
            key={index}
            item={item}
            index={index}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleCheckboxClick={handleCheckboxClick}
            removeInventory={removeInventory}
          />)}/>
        <hr className={styles.pageborder}/>
        <Features character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
        <hr className={styles.pageborder}/>
        <CharacterDetails character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
        <Personality character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
        <hr className={styles.pageborder}/>
        <Notes character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
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

}

export default CharacterSheet
