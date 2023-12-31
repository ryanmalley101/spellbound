import styles from "@/styles/CharacterSheet.module.css"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {API, graphqlOperation} from "aws-amplify";
import {onUpdateCharacterSheet} from "@/graphql/subscriptions";
import * as mutations from "@/graphql/mutations";
import {getCharacterSheet} from "@/graphql/queries";
import useBattlemapStore from "@/stores/battlemapStore";
import {rollAttack, rollCheck} from "@/messageUtilities/mailroom";
import {getToHit} from "@/5eReference/converters";
import {replaceDamageTags} from "@/components/gameComponents/sheets/monstersheet";

const scoreToMod = (score) => {
    return Math.floor((Number(score) - 10) / 2)
}

const AbilityScoreComponent = ({abilityName, score, handleInputChange, handleInputBlur}) => {
    const scoreField = `${abilityName.toLowerCase()}`
    return <li>
        <div className={styles.score}>
            <label className={styles.labelButton} form={abilityName}
                   onClick={() => rollCheck(abilityName, scoreToMod(score))}>
                {abilityName}
            </label>
            <div>
                <label placeholder={"+0"} className={styles.statmod}>{scoreToMod(score)}</label>
            </div>
        </div>
        <div className={styles.modifier}>
            <input key={`${abilityName}_input`} name={scoreField} placeholder={"10"}
                   value={score}
                   onChange={handleInputChange}
                   onBlur={handleInputBlur}
                   className={styles.stat}
                   type="text"/>
        </div>
    </li>
}

const SaveSkillComponent = ({
                                checkName,
                                checkScore,
                                checkProf,
                                isSave,
                                handleToggleSaveProf,
                                handleToggleSkillProf,
                                handleChangeSaveMod,
                                handleChangeSkillMod,
                                handleInputBlur,
                                advantage,
                                playerId,
                                gameId
                            }) => {

    const underscoreName = checkName.toLowerCase().replaceAll(" ", "_")

    const modField = isSave ? `${underscoreName}_save_mod` : `[skills][${underscoreName}`
    // const profField = isSave ? `${underscoreName}` : `${underscoreName}`

    const handleCheckRoll = (name) => {
        rollCheck(name, checkScore, playerId, gameId, advantage)
    }

    return <li>
        <label form={checkName} className={styles.labelButton}
               onClick={() => handleCheckRoll(isSave ? `${checkName} Save` : checkName)}>
            {checkName}
        </label>
        <input placeholder={"+0"}
               type="text"
               value={checkScore}
               onChange={isSave ? (e) => handleChangeSaveMod(underscoreName, e.target.value) : (e) => handleChangeSkillMod(underscoreName, e.target.value)}
               onBlur={handleInputBlur}/>
        <input type="checkbox"
               onChange={isSave ? (e) => handleToggleSaveProf(underscoreName, e.target.checked) : (e) => handleToggleSkillProf(underscoreName, e.target.checked)}
               checked={!!checkProf}/>
    </li>;
}

function Skills(props) {
    // Define an array of skill names
    const skillNames = [
        'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics',
        'Deception', 'History', 'Insight', 'Intimidation',
        'Investigation', 'Medicine', 'Nature', 'Perception',
        'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'
    ];

    return (
        <ul>
            {skillNames.map((skillName) => (
                <SaveSkillComponent
                    key={skillName} // Unique key for each skill component
                    checkName={skillName}
                    checkScore={props.character.skills[skillName.toLowerCase().replaceAll(' ', '_')]}
                    checkProf={!!props.character.skill_proficiencies[skillName.toLowerCase().replaceAll(' ', '_')]}
                    isSave={false}
                    handleInputChange={props.handleInputChange}
                    handleInputBlur={props.handleInputBlur}
                    handleCheckboxClick={props.handleCheckboxClick}
                    playerId={props.playerId}
                    gameId={props.gameId}
                    handleToggleSkillProf={props.handleToggleSkillProf}
                    handleChangeSkillMod={props.handleChangeSkillMod}
                />
            ))}
        </ul>
    );
}

function Saves({character, handleChangeSaveMod, handleToggleSaveProf, handleInputBlur, playerId, gameId}) {
    const savingThrowNames = [
        'Strength', 'Dexterity', 'Constitution',
        'Intelligence', 'Wisdom', 'Charisma'
    ];

    return (
        <div className={"saves " + styles.listSection + " " + styles.box}>
            <ul>
                {savingThrowNames.map((savingThrow) => (
                    <SaveSkillComponent
                        key={savingThrow}
                        checkName={savingThrow}
                        checkScore={character[`${savingThrow.toLowerCase()}_save_mod`]}
                        checkProf={character.save_proficiencies.includes(savingThrow.toLowerCase())}
                        isSave={true}
                        handleToggleSaveProf={handleToggleSaveProf}
                        handleChangeSaveMod={handleChangeSaveMod}
                        handleInputBlur={handleInputBlur}
                        playerId={playerId}
                        gameId={gameId}
                    />
                ))}
            </ul>
            <div className={styles.label}>Saving Throws</div>
        </div>
    );
}

function AbilityScores(props) {
    return <ul>
        <AbilityScoreComponent abilityName={"Strength"} score={props.character.strength}
                               handleInputChange={props.handleInputChange}
                               handleInputBlur={props.handleInputBlur}/>
        <AbilityScoreComponent abilityName={"Dexterity"} score={props.character.dexterity}
                               handleInputChange={props.handleInputChange}
                               handleInputBlur={props.handleInputBlur}/>
        <AbilityScoreComponent abilityName={"Constitution"}
                               score={props.character.constitution}
                               handleInputChange={props.handleInputChange} handleInputBlur={props.handleInputBlur}/>
        <AbilityScoreComponent abilityName={"Intelligence"}
                               score={props.character.intelligence}
                               handleInputChange={props.handleInputChange} handleInputBlur={props.handleInputBlur}/>
        <AbilityScoreComponent abilityName={"Wisdom"} score={props.character.wisdom}
                               handleInputChange={props.handleInputChange}
                               handleInputBlur={props.handleInputBlur}/>
        <AbilityScoreComponent abilityName={"Charisma"} score={props.character.charisma}
                               handleInputChange={props.handleInputChange}
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
                        <div style={{width: "7%", paddingLeft: "10px"}}> To Hit</div>
                        <div style={{width: "28%", paddingLeft: "10px"}}> Damage</div>
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
                       character,
                       attack,
                       index,
                       handleInputChange,
                       handleInputBlur,
                       handleAttackDamageChange,
                       addDamage,
                       removeAttack,
                       playerId,
                       gameId,
                       advantage
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

    const handleAttackRoll = () => {
        rollAttack(attack, character, playerId, gameId, advantage)
    }

    return (
        <div className={styles.attackRow}>
            {/* Always visible labels */}
            <div className={styles.labelRow}>
                <label style={{width: "120px"}}
                       className={styles.labelButton} onClick={handleAttackRoll}>{attack.name}</label>
                <label className={styles.itemLabel}
                       style={{paddingLeft: "20px", width: "57px"}}>{getToHit(character, attack)}</label>
                <div style={{width: "172px", overflowX: "hidden"}}>
                    {attack.damage.map((damage, index) => {
                        if (index < 5) {
                            return <label key={index} className={styles.itemLabel}
                                          style={{paddingLeft: "0px"}}>{replaceDamageTags(damage.damage_dice, character)} {damage.damage_type} {index < attack.damage.length - 1 ? ' + ' : ''}</label>
                        }
                    })}
                </div>
                <label className={styles.itemLabel} style={{paddingLeft: "20px", width: "300px"}}>{attack.notes}</label>
                <button type="button" onClick={toggleForm}
                        style={{float: "right"}}>{isFormOpen ? "Done" : "Edit"}</button>
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
                                                onChange={(e) => handleAttackDamageChange("damage_dice", index, dIndex, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`attacks[${index}].damage[${dIndex}].damage_type`}
                                                value={damage.damage_type}
                                                onChange={(e) => handleAttackDamageChange("damage_type", index, dIndex, e.target.value)}
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
                        <button className={styles.itemButton} type={"button"} onClick={handleConfirm}
                                style={{width: "20%"}}>Confirm
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

const SpellRow = ({
                      spell,
                      index,
                      handleInputChange,
                      handleInputBlur,
                      handleCheckboxClick,
                      addDamage,
                      removeSpell,
                      handleSpellDamageChange
                  }) => {
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
                <button className={styles.itemButton} type="button"
                        onClick={toggleForm}>{isFormOpen ? "Done" : "Edit"}</button>
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
                            name={`spells[${index}].level`}
                            value={spell.level}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Cast Time: </b></label>
                        <input
                            type="text"
                            name={`spells[${index}].cast_time`}
                            value={spell.cast_time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Range: </b></label>
                        <input
                            type="text"
                            name={`spells[${index}].range_shape`}
                            value={spell.range_shape}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Duration: </b></label>
                        <input
                            type="text"
                            name={`spells[${index}].duration`}
                            value={spell.duration}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Save Ability: </b></label>
                        <input
                            type="text"
                            name={`spells[${index}].save_ability`}
                            value={spell.save_ability}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Components: </b></label>
                        <input
                            type="text"
                            name={`spells[${index}].components`}
                            value={spell.components}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Attack Bonus / Save DC: </b></label>
                        <input
                            type="number"
                            name={`spells[${index}].attack_save`}
                            value={spell.attack_save}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label><b>Source: </b></label>
                        <input
                            type="text"
                            name={`spells[${index}].source`}
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
                            {spell.damage ? spell.damage.map((damage, dIndex) => {
                                return (
                                    <tr key={dIndex}>
                                        <td>
                                            <input
                                                type="text"
                                                name={`spells[${index}].damage[${dIndex}].damage_dice`}
                                                value={damage.damage_dice}
                                                onChange={(e) => handleSpellDamageChange('damage_dice', index, dIndex, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`spells[${index}].damage[${dIndex}].damage_type`}
                                                value={damage.damage_type}
                                                onChange={(e) => handleSpellDamageChange('damage_type', index, dIndex, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                );
                            }) : null}
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
                        <button className={styles.itemButton} type={"button"} onClick={handleConfirm}
                                style={{width: "20%"}}>Confirm
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
                            <td><input name="sp_maximum" type="text" placeholder={"0"}
                                       value={props.character.sp_maximum}
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
                                <td><input name="weight_capacity" placeholder={"0"}
                                           value={props.character.weight_capacity}
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
                                <label form="pp">pp</label><input name="pp" value={props.character.pp}
                                                                  onChange={props.onChange}
                                                                  onBlur={props.onBlur}/>
                            </li>
                            <li>
                                <label form="gp">gp</label><input name="gp" value={props.character.gp}
                                                                  onChange={props.onChange}
                                                                  onBlur={props.onBlur}/>
                            </li>
                            <li>
                                <label form="ep">ep</label><input name="ep" value={props.character.ep}
                                                                  onChange={props.onChange}
                                                                  onBlur={props.onBlur}/>
                            </li>
                            <li>
                                <label form="sp">sp</label><input name="sp" value={props.character.sp}
                                                                  onChange={props.onChange}
                                                                  onBlur={props.onBlur}/>
                            </li>
                            <li>
                                <label form="cp">cp</label><input name="cp" value={props.character.cp}
                                                                  onChange={props.onChange}
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
                            <td><input name="attunement0" type="text" value={props.character.attunement0}
                                       onChange={props.onChange}
                                       onBlur={props.onBlur}/></td>
                        </tr>
                        <tr>
                            <td><input name="attunement1" type="text" value={props.character.attunement1}
                                       onChange={props.onChange}
                                       onBlur={props.onBlur}/></td>
                        </tr>
                        <tr>
                            <td><input name="attunement2" type="text" value={props.character.attunement2}
                                       onChange={props.onChange}
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
                    <textarea className={styles.textarea} name="attunement_notes"
                              placeholder="Additional attunement notes"
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
                    <textarea className={styles.textarea} name="inventory_notes"
                              placeholder="Additional inventory notes"
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
                    <label form="gender">Gender</label><input name="gender" placeholder="Gender"
                                                              value={props.character.gender}
                                                              onChange={props.onChange} onBlur={props.onBlur}/>
                </li>
                <li>
                    <label form="age">Age</label><input name="age" placeholder="Age" value={props.character.age}
                                                        onChange={props.onChange} onBlur={props.onBlur}/>
                </li>
                <li>
                    <label form="height">Height</label><input name="height" placeholder="Height"
                                                              value={props.character.height}
                                                              onChange={props.onChange} onBlur={props.onBlur}/>
                </li>
                <li>
                    <label form="weight">Weight</label><input name="weight" placeholder="Weight"
                                                              value={props.character.weight}
                                                              onChange={props.onChange} onBlur={props.onBlur}/>
                </li>
                <li>
                    <label form="faith">Faith</label><input name="faith" placeholder="Faith"
                                                            value={props.character.faith}
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
                    <label form="temp_hp">Temporary Hit Points</label><input name="temp_hp" placeholder={"0"}
                                                                             type="text"
                                                                             value={props.character.temp_hp}
                                                                             onChange={props.onChange}
                                                                             onBlur={props.onBlur}/>
                </div>
            </div>
            <div className={styles.hitdice}>
                <div>
                    <div className={styles.total}>
                        <label form="total_hd">Total</label><input name="total_hd" placeholder="_d__" type="text"
                                                                   value={props.character.total_hd}
                                                                   onChange={props.onChange}
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

    const changeAdvantage = (value) => {
        props.setAdvantage(value)
    }

    return <section>
        <section className={styles.flavor}>
            <div
                style={{
                    display: "inline-block",
                    flexDirection: "column-reverse",
                    width: "calc(100% - 10px)",
                    padding: "5px"
                }}>

                <button className={props.advantage === "advantage" ? styles.buttonPressed : styles.button}
                        name="button-advantage"
                        type="button"
                        onClick={() => changeAdvantage("advantage")}
                        style={{width: "33%"}}>Advantage
                </button>
                <button className={props.advantage === "normal" ? styles.buttonPressed : styles.button}
                        name="button-normalroll" type="button"
                        onClick={() => changeAdvantage("normal")}
                        style={{width: "33%"}}>Normal
                </button>
                <button className={props.advantage === "disadvantage" ? styles.buttonPressed : styles.button}
                        name="button-disadvantage" type="button"
                        onClick={() => changeAdvantage("disadvantage")}
                        style={{width: "33%"}}>Disadvantage
                </button>
            </div>
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
                <label form="backstory">Character Backstory</label><textarea className={styles.textarea}
                                                                             name="backstory"
                                                                             value={props.character.backstory}
                                                                             onChange={props.onChange}
                                                                             onBlur={props.onBlur}
            />
            </div>
        </section>
        <section>
            <section className={styles.flavor}>
                <div className={styles.personality}>
                    <label form="personality">Personality</label><textarea className={styles.textarea}
                                                                           name="personality"
                                                                           value={props.character.personality}
                                                                           onChange={props.onChange}
                                                                           onBlur={props.onBlur}
                />
                </div>
                <div className={styles.ideals}>
                    <label form="ideals">Ideals</label><textarea className={styles.textarea} name="ideals"
                                                                 value={props.character.ideals}
                                                                 onChange={props.onChange}
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
                                                                    value={props.character.alignment}
                                                                    onChange={props.onChange}
                                                                    onBlur={props.onBlur}/>
                </li>
                <li>
                    <label form="xp">Experience Points</label><input name="xp" placeholder={"0"}
                                                                     value={props.character.xp}
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
                <AbilityScores character={props.character}
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
                <Saves character={props.character}
                       handleInputChange={props.handleInputChange}
                       handleInputBlur={props.handleInputBlur} handleCheckboxClick={props.handleCheckboxClick}
                       playerId={props.playerId} gameId={props.gameId} handleToggleSaveProf={props.handleToggleSaveProf}
                       handleChangeSaveMod={props.handleChangeSaveMod}/>

                <div className={styles.skills + " " + styles.listSection + " " + styles.box}>
                    <Skills character={props.character}
                            handleInputChange={props.handleInputChange}
                            handleInputBlur={props.handleInputBlur}
                            handleCheckboxClick={props.handleCheckboxClick}
                            playerId={props.playerId}
                            gameId={props.gameId}
                            handleToggleSkillProf={props.handleToggleSkillProf}
                            handleChangeSkillMod={props.handleChangeSkillMod}/>
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
    const [advantage, setAdvantage] = useState("normal");

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
        // console.log("Character pre update changed")
        // console.log(characterPreUpdate)
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

    const handleAttackDamageChange = (field, index, dIndex, value) => {
        console.log(field, index, dIndex, value)
        const attacks = character.attacks
        const damage = attacks[index].damage[dIndex]
        damage[field] = value
        setCharacter({...character, attacks})
    }

    const handleSpellDamageChange = (field, index, dIndex, value) => {
        console.log(field, index, dIndex, value)
        const spells = character.spells
        const damage = spells[index].damage[dIndex]
        damage[field] = value
        setCharacter({...character, spells})
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
            const updatedNestedProperty = {
                ...character[target][index],
                [property]: !character[target][index][property]
            };

            // Create an intermediate object for the inner array to update
            const updatedInnerArray = [...character[target]];
            updatedInnerArray[index] = updatedNestedProperty;

            // Create the final updated character object with the updated array
            const updatedCharacter = {...character, [target]: updatedInnerArray};

            setCharacter(updatedCharacter);
            setCharacterPreUpdate({...characterPreUpdate, [target]: updatedInnerArray});
        } else {
            setCharacterPreUpdate({...characterPreUpdate, [e.target.name]: !character[e.target.name], id: character.id})
            handleInputBlur()
            console.log(e.target.name)
        }
    }

    const handleToggleSaveProf = (save, prof) => {
        let save_proficiences = character.save_proficiencies
        if (prof) {
            save_proficiences = save_proficiences.filter((s) => s !== save)
        } else {
            if (!save_proficiences.includes(save)) save_proficiences.push(save)
        }
        setCharacter({...character, save_proficiences})
        setCharacterPreUpdate({...characterPreUpdate, save_proficiences})
    }

    const handleToggleSkillProf = (skill, prof) => {
        let skill_proficiences = character.skill_proficiencies
        prof ? skill_proficiences[skill] = 'proficient' : skill_proficiences[skill] = ''
        setCharacter(...character, skill_proficiences)
        setCharacterPreUpdate({...characterPreUpdate, skill_proficiences})
    }

    const handleChangeSaveMod = (save, mod) => {
        setCharacter({...character, [`${save}_save_mod`]: mod})
        setCharacterPreUpdate({...characterPreUpdate, [`${save}_save_mod`]: mod})
    }

    const handleChangeSkillMod = (skill, mod) => {
        setCharacter({...character, skills: {...character.skills, skill: mod}})
        setCharacterPreUpdate({...characterPreUpdate, skills: {...character.skills, skill: mod}})
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
        console.log(`Removing spell ${index}`)
        const newSpells = [...character.spells]
        newSpells.splice(index, 1)
        setCharacterPreUpdate({
            spells: newSpells,
            id: character.id
        })
        handleInputBlur()
    }

    const removeInventory = (index) => {
        const newInventory = [...character.inventory]
        newInventory.splice(index, 1)
        setCharacterPreUpdate({
            inventory: newInventory,
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

    if (character) {
        return (
            <form className={styles.charsheet} id="charsheet">
                <NameBackground character={character} onChange={handleInputChange} onBlur={handleInputBlur}/>
                <main>
                    <Modifiers key={"Charisma"} character={character}
                               handleInputBlur={handleInputBlur}
                               playerId={playerID} gameId={gameID} handleToggleSaveProf={handleToggleSaveProf}
                               handleChangeSaveMod={handleChangeSaveMod}
                               handleToggleSkillProf={handleToggleSkillProf}
                               handleChangeSkillMod={handleChangeSkillMod} handleInputChange={handleInputChange}/>
                    <CombatValues character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                                  onChange1={handleCheckboxClick}/>
                    <Attributes character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                                setAdvantage={setAdvantage} advantage={advantage}/>
                </main>
                <AttackList character={character} callbackfn={(attack, index) => (
                    <AttackRow
                        key={index}
                        character={character}
                        attack={attack}
                        index={index}
                        handleInputChange={handleInputChange}
                        handleInputBlur={handleInputBlur}
                        handleAttackDamageChange={handleAttackDamageChange}
                        addDamage={addAttackDamage}
                        removeAttack={removeAttack}
                        playerId={playerID}
                        gameId={gameID}
                        advantage={advantage}
                    />
                )} onClick={addAttack} onClick1={removeLastRow('attacktable')} onChange={handleInputChange}
                            onBlur={handleInputBlur}/>
                <hr className={styles.pageborder}/>
                <SpellList character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                           callbackfn={(attack, index) => (
                               <SpellRow key={index} spell={attack} index={index}
                                         handleInputChange={handleInputChange}
                                         handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}
                                         addDamage={addSpellDamage} removeSpell={removeSpell}
                                         handleSpellDamageChange={handleSpellDamageChange}/>
                           )} addSpell={addSpell} onClick1={removeLastRow('spelltable')}/>
                <hr className={styles.pageborder}/>
                <InventoryList character={character} onChange={handleInputChange} onBlur={handleInputBlur}
                               handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}
                               onClick={addAttunement} onClick1={removeLastRow('attunementtable')}
                               addInventory={addInventory} removeInventory={removeInventory}
                               callbackfn={(item, index) => (
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
