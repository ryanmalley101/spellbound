import styles from "@/styles/CharacterSheet.module.css"

const CharacterSheet = ({name, id}) => {

  // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  // <link rel="stylesheet" href="./style.css">

  const calcCarryWeight = () => {
    return null
  }

  const addInventory = () => {
    return null
  }

  const removeInventory = () => {
    return null
  }

  const saveCharacter = () => {
    return null
  }

  const removeLastRow = () => {
    return null
  }

  const addSpell = () => {
    return null
  }

  const addAttunement = () => {
    return null
  }

  const addAttack = () => {
    return null
  }

  const longRest = () => {
    return null
  }

  return (
    <form className={styles.charsheet} id="charsheet">
      <header>
        <section>
          <button className={styles.button} name="buttonsave" type="button" onClick={saveCharacter}
                  style={{width: '100px', marginBottom: '5px', marginRight: '30px'}}>Save Character
          </button>
          <label form="buttonload" id="loadlabel" style={{textTransform: 'Capitalize'}}>Load Character</label><input
          name="buttonload" id="buttonload" type="file" style={{width: '200px', marginBottom: '5px'}}/>
          <button className={styles.button} name="buttonrest" type="button" onClick={longRest}
                  style={{width: '100px', marginBottom: '5px', marginLeft: '30px'}}>Long Rest
          </button>
          <label form="autosave"
                 style={{textTransform: 'Capitalize', fontWeight: 'bold', padding: '0px 10px'}}>Autosave?</label><input
          name="autosave" id="autosave" type="checkbox"/>
        </section>
      </header>
      <header>
        <section className={styles.charname}>
          <label form="charname">Character Name</label><input name="charname" id="charname"
                                                              placeholder="Character Name"/>
        </section>
        <section className={styles.misc}>
          <ul>
            <li>
              <label form="classlevel">Class &amp; Level</label><input name="classlevel" placeholder="Class 1"/>
            </li>
            <li>
              <label form="background">Background</label><input name="background" placeholder="Background"/>
            </li>
            <li>
              <label form="playername">Player Name</label><input name="playername" placeholder="Player Name"/>
            </li>
            <li>
              <label form="race">Race</label><input name="race" placeholder="Race"/>
            </li>
            <li>
              <label form="alignment">Alignment</label><input name="alignment" placeholder="Alignment"/>
            </li>
            <li>
              <label form="experiencepoints">Experience Points</label><input name="experiencepoints" placeholder={"0"}/>
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
                    <label form="Strengthscore">Strength</label><input name="Strengthscore" placeholder={"10"}
                                                                       className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="Strengthmod" placeholder={"+0"} className={styles.statmod}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="Dexterityscore">Dexterity</label><input name="Dexterityscore" placeholder={"10"}
                                                                         className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="Dexteritymod" placeholder={"+0"} className={styles.statmod}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="Constitutionscore">Constitution</label><input name="Constitutionscore"
                                                                               placeholder={"10"}
                                                                               className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="Constitutionmod" placeholder={"+0"} className={styles.statmod}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="Intelligencescore">Intelligence</label><input name="Intelligencescore"
                                                                               placeholder={"10"}
                                                                               className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="Intelligencemod" placeholder={"+0"} className={styles.statmod}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="Wisdomscore">Wisdom</label><input name="Wisdomscore" placeholder={"10"}
                                                                   className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="Wisdommod" placeholder={"+0"}/>
                  </div>
                </li>
                <li>
                  <div className={styles.score}>
                    <label form="Charismascore">Charisma</label><input name="Charismascore" placeholder={"10"}
                                                                       className={styles.stat}/>
                  </div>
                  <div className={styles.modifier}>
                    <input name="Charismamod" placeholder={"+0"} className={styles.statmod}/>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className={styles.proficiencybonus + " " + styles.box}>
                <div className={styles.labelContainer}>
                  <label form="inspiration">Inspiration</label>
                </div>
                <input name="inspiration"/>
              </div>
              <div className={styles.proficiencybonus + " " + styles.box}>
                <div className={styles.labelContainer}>
                  <label form="proficiencybonus">Proficiency Bonus</label>
                </div>
                <input name="proficiencybonus" placeholder={"+2"}/>
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
                    <label form="Strength-save">Strength</label><input name="Strength-save" placeholder={"+0"}
                                                                       type="text"/><input name="Strength-save-prof"
                                                                                           type="checkbox"/>
                  </li>
                  <li>
                    <label form="Dexterity-save">Dexterity</label><input name="Dexterity-save" placeholder={"+0"}
                                                                         type="text"/><input name="Dexterity-save-prof"
                                                                                             type="checkbox"/>
                  </li>
                  <li>
                    <label form="Constitution-save">Constitution</label><input name="Constitution-save"
                                                                               placeholder={"+0"}
                                                                               type="text"/><input
                    name="Constitution-save-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Intelligence-save">Intelligence</label><input name="Intelligence-save"
                                                                               placeholder={"+0"}
                                                                               type="text"/><input
                    name="Intelligence-save-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Wisdom-save">Wisdom</label><input name="Wisdom-save" placeholder={"+0"}
                                                                   type="text"/><input name="Wisdom-save-prof"
                                                                                       type="checkbox"/>
                  </li>
                  <li>
                    <label form="Charisma-save">Charisma</label><input name="Charisma-save" placeholder={"+0"}
                                                                       type="text"/><input name="Charisma-save-prof"
                                                                                           type="checkbox"/>
                  </li>
                </ul>
                <div className={styles.label}>
                  Saving Throws
                </div>
              </div>
              <div className={styles.skills + " " + styles.listSection + " " + styles.box}>
                <ul>
                  <li>
                    <label form="Acrobatics">Acrobatics <span className={styles.skill}>(Dex)</span></label><input
                    name="Acrobatics" placeholder={"+0"} type="text"/><input name="Acrobatics-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Animal Handling">Animal Handling <span
                      className={styles.skill}>(Wis)</span></label><input
                    name="Animal Handling" placeholder={"+0"} type="text"/><input name="Animal Handling-prof"
                                                                                  type="checkbox"/>
                  </li>
                  <li>
                    <label form="Arcana">Arcana <span className={styles.skill}>(Int)</span></label><input name="Arcana"
                                                                                                          placeholder={"+0"}
                                                                                                          type="text"/><input
                    name="Arcana-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Athletics">Athletics <span className={styles.skill}>(Str)</span></label><input
                    name="Athletics" placeholder={"+0"} type="text"/><input name="Athletics-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Deception">Deception <span className={styles.skill}>(Cha)</span></label><input
                    name="Deception" placeholder={"+0"} type="text"/><input name="Deception-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="History">History <span className={styles.skill}>(Int)</span></label><input
                    name="History"
                    placeholder={"+0"}
                    type="text"/><input
                    name="History-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Insight">Insight <span className={styles.skill}>(Wis)</span></label><input
                    name="Insight"
                    placeholder={"+0"}
                    type="text"/><input
                    name="Insight-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Intimidation">Intimidation <span className={styles.skill}>(Cha)</span></label><input
                    name="Intimidation" placeholder={"+0"} type="text"/><input name="Intimidation-prof"
                                                                               type="checkbox"/>
                  </li>
                  <li>
                    <label form="Investigation">Investigation <span className={styles.skill}>(Int)</span></label><input
                    name="Investigation" placeholder={"+0"} type="text"/><input name="Investigation-prof"
                                                                                type="checkbox"/>
                  </li>
                  <li>
                    <label form="Medicine">Medicine <span className={styles.skill}>(Wis)</span></label><input
                    name="Medicine"
                    placeholder={"+0"}
                    type="text"/><input
                    name="Medicine-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Nature">Nature <span className={styles.skill}>(Int)</span></label><input name="Nature"
                                                                                                          placeholder={"+0"}
                                                                                                          type="text"/><input
                    name="Nature-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Perception">Perception <span className={styles.skill}>(Wis)</span></label><input
                    name="Perception" placeholder={"+0"} type="text"/><input name="Perception-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Performance">Performance <span className={styles.skill}>(Cha)</span></label><input
                    name="Performance" placeholder={"+0"} type="text"/><input name="Performance-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Persuasion">Persuasion <span className={styles.skill}>(Cha)</span></label><input
                    name="Persuasion" placeholder={"+0"} type="text"/><input name="Persuasion-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Religion">Religion <span className={styles.skill}>(Int)</span></label><input
                    name="Religion"
                    placeholder={"+0"}
                    type="text"/><input
                    name="Religion-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Sleight of Hand">Sleight of Hand <span
                      className={styles.skill}>(Dex)</span></label><input
                    name="Sleight of Hand" placeholder={"+0"} type="text"/><input name="Sleight of Hand-prof"
                                                                                  type="checkbox"/>
                  </li>
                  <li>
                    <label form="Stealth">Stealth <span className={styles.skill}>(Dex)</span></label><input
                    name="Stealth"
                    placeholder={"+0"}
                    type="text"/><input
                    name="Stealth-prof" type="checkbox"/>
                  </li>
                  <li>
                    <label form="Survival">Survival <span className={styles.skill}>(Wis)</span></label><input
                    name="Survival"
                    placeholder={"+0"}
                    type="text"/><input
                    name="Survival-prof" type="checkbox"/>
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
                <label form="ac">Armor Class</label><input name="ac" placeholder={"10"} type="text"/>
              </div>
            </div>
            <div className={styles.initiative}>
              <div>
                <label form="initiative">Initiative</label><input name="initiative" placeholder={"+0"} type="text"/>
              </div>
            </div>
            <div className={styles.speed}>
              <div>
                <label form="speed">Speed</label><input name="speed" placeholder="30ft" type="text"/>
              </div>
            </div>
            <div className={styles.armorclass}>
              <div>
                <label form="currenthp">Current Hit Points</label><input name="currenthp" placeholder={"10"}
                                                                         type="text"/>
              </div>
            </div>
            <div className={styles.initiative}>
              <div>
                <label form="maxhp">Hit Point Maximum</label><input name="maxhp" placeholder={"10"} type="text"/>
              </div>
            </div>
            <div className={styles.speed}>
              <div>
                <label form="temphp">Temporary Hit Points</label><input name="temphp" placeholder={"0"} type="text"/>
              </div>
            </div>
            <div className={styles.hitdice}>
              <div>
                <div className={styles.total}>
                  <label form="totalhd">Total</label><input name="totalhd" placeholder="_d__" type="text"/>
                </div>
                <div className={styles.remaining}>
                  <label form="remaininghd">Hit Dice</label><input name="remaininghd" type="text"/>
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
                      <input name="deathsuccess1" type="checkbox"/>
                      <input name="deathsuccess2" type="checkbox"/>
                      <input name="deathsuccess3" type="checkbox"/>
                    </div>
                  </div>
                  <div className={styles.deathfails}>
                    <label>Failures</label>
                    <div className={styles.bubbles}>
                      <input name="deathfail1" type="checkbox"/>
                      <input name="deathfail2" type="checkbox"/>
                      <input name="deathfail3" type="checkbox"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.otherprofs + " " + styles.box + " " + styles.textblock}>
            <label form="otherprofs">Other Proficiencies and Languages</label><textarea className={styles.textarea}
                                                                                        name="otherprofs"
                                                                                        defaultValue={""}/>
          </div>
        </section>
        <section>
          <section className={styles.flavor}>
            <div className={styles.personality}>
              <label form="defenses">Defenses &amp; Active Conditions</label><textarea className={styles.textarea}
                                                                                       name="defenses"
                                                                                       defaultValue={""}/>
            </div>
            <div className={styles.ideals}>
              <label form="savenotes">Saving Throw Notes</label><textarea className={styles.textarea} name="savenotes"
                                                                          defaultValue={""}/>
            </div>
            <div className={styles.bonds}>
              <label form="movement">Movement Speeds</label><textarea className={styles.textarea} name="movement"
                                                                      defaultValue={""}/>
            </div>
            <div className={styles.flaws}>
              <label form="senses">Senses</label><textarea className={styles.textarea} name="senses" defaultValue={""}/>
            </div>
          </section>
          <div className={styles.passivePerception + " " + styles.box}>
            <div className="label-container">
              <label form="passiveperception">Passive Wisdom (Perception)</label>
            </div>
            <input name="passiveperception" placeholder={"10"}/>
          </div>
          <div className={styles.passivePerception + " " + styles.box}>
            <div className="label-container">
              <label form="passiveinsight">Passive Wisdom (Insight)</label>
            </div>
            <input name="passiveinsight" placeholder={"10"}/>
          </div>
          <div className={styles.passivePerception + " " + styles.box}>
            <div className={styles.labelContainer}>
              <label form="passiveinvestigation">Passive Intelligence (Investigation)</label>
            </div>
            <input name="passiveinvestigation" placeholder={"10"}/>
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
              <tr>
                <td>
                  <input name="atkname0" type="text"/>
                </td>
                <td>
                  <input name="atkbonus0" type="text"/>
                </td>
                <td>
                  <input name="atkdamage0" type="text"/>
                </td>
                <td colSpan={2}>
                  <input name="atknotes0" type="text"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input name="atkname1" type="text"/>
                </td>
                <td>
                  <input name="atkbonus1" type="text"/>
                </td>
                <td>
                  <input name="atkdamage1" type="text"/>
                </td>
                <td colSpan={2}>
                  <input name="atknotes1" type="text"/>
                </td>
              </tr>
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-addattack" type="button" onClick={addAttack}
                  style={{width: '20%'}}>Add New Attack</button>
          <button className={styles.button} name="button-removeattack" type="button"
                  onClick={removeLastRow('attacktable')}
                  style={{width: '20%'}}>Remove Attack</button>
        </span>
            <textarea className={styles.textarea} name="attacksnotes" defaultValue={""}/>
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
                <td><input name="spellslots1" type="text"/></td>
                <td><input name="spellslots2" type="text"/></td>
                <td><input name="spellslots3" type="text"/></td>
                <td><input name="spellslots4" type="text"/></td>
                <td><input name="spellslots5" type="text"/></td>
                <td><input name="spellslots6" type="text"/></td>
                <td><input name="spellslots7" type="text"/></td>
                <td><input name="spellslots8" type="text"/></td>
                <td><input name="spellslots9" type="text"/></td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td><input name="spellslotsmax1" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax2" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax3" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax4" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax5" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax6" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax7" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax8" type="text" placeholder={"0"}/></td>
                <td><input name="spellslotsmax9" type="text" placeholder={"0"}/></td>
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
                <th><input name="pactlevel" type="text"/></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Available</td>
                <td><input name="pactslots1" type="text"/></td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td><input name="pactslotsmax1" type="text" placeholder={"0"}/></td>
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
              <tr>
                <td>
                  <input name="spellprep1" type="checkbox"/>
                </td>
                <td>
                  <input name="spellname0" type="text"/>
                </td>
                <td>
                  <input name="spelllevel0" type="text"/>
                </td>
                <td>
                  <input name="spellsource0" type="text"/>
                </td>
                <td>
                  <input name="spellattacksave0" type="text"/>
                </td>
                <td>
                  <input name="spelltime0" type="text"/>
                </td>
                <td>
                  <input name="spellrange0" type="text"/>
                </td>
                <td>
                  <input name="spellduration0" type="text"/>
                </td>
                <td>
                  <input name="spellcomponents0" type="text"/>
                </td>
                <td>
                  <input name="spellnotes0" type="text"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input name="spellprep1" type="checkbox"/>
                </td>
                <td>
                  <input name="spellname1" type="text"/>
                </td>
                <td>
                  <input name="spelllevel1" type="text"/>
                </td>
                <td>
                  <input name="spellsource1" type="text"/>
                </td>
                <td>
                  <input name="spellattacksave1" type="text"/>
                </td>
                <td>
                  <input name="spelltime1" type="text"/>
                </td>
                <td>
                  <input name="spellrange1" type="text"/>
                </td>
                <td>
                  <input name="spellduration1" type="text"/>
                </td>
                <td>
                  <input name="spellcomponents1" type="text"/>
                </td>
                <td>
                  <input name="spellnotes1" type="text"/>
                </td>
              </tr>
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-addspell" type="button" onClick={addSpell}
                  style={{width: '20%'}}>Add New Spell</button>
          <button className={styles.button} name="button-removespell" type="button"
                  onClick={removeLastRow('spelltable')}
                  style={{width: '20%'}}>Remove Spell</button>
        </span>
            <textarea className={styles.textarea} name="spellsnotes" placeholder="Additional spell notes"
                      defaultValue={""}/>
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
                  <td><input name="weightcarried" id="weightcarried" placeholder={"0"} readOnly/></td>
                </tr>
                <tr>
                  <th>Weight Capacity</th>
                </tr>
                <tr>
                  <td><input name="weightcapacity" placeholder={"0"}/></td>
                </tr>
                </tbody>
              </table>
              <textarea className={styles.textarea} name="encumberancenotes" placeholder="Additional encumberance notes"
                        style={{height: '12em'}}
                        defaultValue={""}/>
            </div>
          </div>
        </section>
        <section className={styles.currency} style={{width: '30%'}}>
          <div>
            <label style={{order: 0, padding: '5px'}}>Currency</label>
            <div className={styles.money}>
              <ul>
                <li>
                  <label form="pp">pp</label><input name="pp"/>
                </li>
                <li>
                  <label form="gp">gp</label><input name="gp"/>
                </li>
                <li>
                  <label form="ep">ep</label><input name="ep"/>
                </li>
                <li>
                  <label form="sp">sp</label><input name="sp"/>
                </li>
                <li>
                  <label form="cp">cp</label><input name="cp"/>
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
                <td><input name="attunement0" type="text"/></td>
              </tr>
              <tr>
                <td><input name="attunement1" type="text"/></td>
              </tr>
              <tr>
                <td><input name="attunement2" type="text"/></td>
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
            <textarea className={styles.textarea} name="attunementsnotes" placeholder="Additional attunement notes"
                      defaultValue={""}/>
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
              <tr>
                <td>
                  <input name="itemequipped0" type="checkbox"/>
                </td>
                <td>
                  <input name="itemname0" type="text"/>
                </td>
                <td>
                  <input name="itemcount0" type="text" onChange={calcCarryWeight}/>
                </td>
                <td>
                  <input name="itemweight0" type="text" onChange={calcCarryWeight}/>
                </td>
                <td>
                  <input name="itemvalue0" type="text"/>
                </td>
                <td>
                  <input name="itemnotes0" type="text"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input name="itemequipped1" type="checkbox"/>
                </td>
                <td>
                  <input name="itemname1" type="text"/>
                </td>
                <td>
                  <input name="itemcount1" type="text" onChange={calcCarryWeight}/>
                </td>
                <td>
                  <input name="itemweight1" type="text" onChange={calcCarryWeight}/>
                </td>
                <td>
                  <input name="itemvalue1" type="text"/>
                </td>
                <td>
                  <input name="itemnotes1" type="text"/>
                </td>
              </tr>
              </tbody>
            </table>
            <span>
          <button className={styles.button} name="button-additem" type="button" onClick={addInventory}
                  style={{width: '20%'}}>Add New Item</button>
          <button className={styles.button} name="button-removeitem" type="button" onClick={removeInventory}
                  style={{width: '20%'}}>Remove Item</button>
        </span>
            <textarea className={styles.textarea} name="inventorynotes" placeholder="Additional inventory notes"
                      defaultValue={""}/>
          </div>
        </section>
      </header>
      <hr className={styles.pageborder}/>
      <main>
        <section className={styles.features} id="feautres-left">
          <div>
            <label form="features-l">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                    name="features-l"
                                                                                    defaultValue={""}/>
          </div>
        </section>
        <section className={styles.features} id="feautres-center">
          <div>
            <label form="features-c">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                    name="features-c"
                                                                                    defaultValue={""}/>
          </div>
        </section>
        <section className={styles.features} id="feautres-right">
          <div>
            <label form="features-r">Features, Traits, &amp; Feats</label><textarea className={styles.textarea}
                                                                                    name="features-r"
                                                                                    defaultValue={""}/>
          </div>
        </section>
      </main>
      <hr className={styles.pageborder}/>
      <header>
        <section className={styles.misc} id="misc-desc">
          <ul>
            <li>
              <label form="gender">Gender</label><input name="gender" placeholder="Gender"/>
            </li>
            <li>
              <label form="age">Age</label><input name="age" placeholder="Age"/>
            </li>
            <li>
              <label form="height">Height</label><input name="height" placeholder="Height"/>
            </li>
            <li>
              <label form="weight">Weight</label><input name="weight" placeholder="Weight"/>
            </li>
            <li>
              <label form="faith">Faith</label><input name="faith" placeholder="Faith"/>
            </li>
            <li>
              <label form="skin">Skin</label><input name="skin" placeholder="Skin"/>
            </li>
            <li>
              <label form="eyes">Eyes</label><input name="eyes" placeholder="Eyes"/>
            </li>
            <li>
              <label form="hair">Hair</label><input name="hair" placeholder="Hair"/>
            </li>
          </ul>
        </section>
      </header>
      <main>
        <section className={styles.features} id="allies-orgs-enemies">
          <div>
            <label form="organizations">Allies, Organizations, &amp; Enemies</label><textarea
            className={styles.textarea}
            name="organizations"
            defaultValue={""}/>
          </div>
        </section>
        <section className={styles.features} id="backstory">
          <div>
            <label form="backstory">Character Backstory</label><textarea className={styles.textarea} name="backstory"
                                                                         defaultValue={""}/>
          </div>
        </section>
        <section>
          <section className={styles.flavor}>
            <div className={styles.personality}>
              <label form="personality">Personality</label><textarea className={styles.textarea} name="personality"
                                                                     defaultValue={""}/>
            </div>
            <div className={styles.ideals}>
              <label form="ideals">Ideals</label><textarea className={styles.textarea} name="ideals" defaultValue={""}/>
            </div>
            <div className={styles.bonds}>
              <label form="bonds">Bonds</label><textarea className={styles.textarea} name="bonds" defaultValue={""}/>
            </div>
            <div className={styles.flaws}>
              <label form="flaws">Flaws</label><textarea className={styles.textarea} name="flaws" defaultValue={""}/>
            </div>
          </section>
        </section>
      </main>
      <hr className={styles.pageborder}/>
      <main>
        <section className={styles.features} id="notes-left">
          <div>
            <label form="notes-l">Additional Notes</label><textarea className={styles.textarea} name="notes-l"
                                                                    defaultValue={""}/>
          </div>
        </section>
        <section className={styles.features} id="notes-center">
          <div>
            <label form="notes-c">Additional Notes</label><textarea className={styles.textarea} name="notes-c"
                                                                    defaultValue={""}/>
          </div>
        </section>
        <section className={styles.features} id="notes-right">
          <div>
            <label form="notes-r">Additional Notes</label><textarea className={styles.textarea} name="notes-r"
                                                                    defaultValue={""}/>
          </div>
        </section>
      </main>
      <main>
        <input name="rows_attacks" type="hidden" defaultValue={2}/>
        <input name="rows_attunements" type="hidden" defaultValue={3}/>
        <input name="rows_inventory" type="hidden" defaultValue={2}/>
        <input name="rows_spells" type="hidden" defaultValue={2}/>
      </main>
    </form>
  )
}

export default CharacterSheet