import styles from "@/styles/CharacterSheet.module.css"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getExampleCharacter} from "@/5eReference/characterSheetGenerators";
import {API, graphqlOperation} from "aws-amplify";
import {onUpdateCharacterSheet, onUpdateToken} from "@/graphql/subscriptions";
import * as mutations from "@/graphql/mutations";
import {updateCharacterSheet} from "@/graphql/mutations";
import {getCharacterSheet, getGame} from "@/graphql/queries";
import {DiceRoller} from "@dice-roller/rpg-dice-roller";
import useBattlemapStore from "@/stores/battlemapStore";
import * as PropTypes from "prop-types";

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

  const modField = isSave ? `${checkName.toLowerCase().replace(" ", "_")}_save_mod` : `${checkName.toLowerCase().replace(" ", "_")}_mod`
  const profField = `${checkName.toLowerCase().replace(" ", "_")}_prof`

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
  return <ul>
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
  </ul>;
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

const AttackRow = ({attack, index, rollAttack, handleInputChange, handleInputBlur}) => {
  return (
    <tr>
      <td>
        <input
          className={styles.labelButton}
          onClick={() => rollAttack(attack)}
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
      <td>
        <input
          type="text"
          name={`attacks[${index}].damage_type`}
          value={attack.damage_type}
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

const SpellRow = ({spell, index, handleInputChange, handleInputBlur, handleCheckboxClick}) => {

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

const CharacterSheet = ({characterSheetInput}) => {

  const gameID = useBattlemapStore((state) => state.gameID)
  const playerID = useBattlemapStore((state) => state.playerID)

  // Pull inventory row out
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

  useEffect(() => {
    if (!character) return
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const updatedSheet = data.value.data.onUpdateCharacterSheet;
      console.log('Current Tokens:', character)
      console.log('Updated Sheet from Subscription:', updatedSheet);
      setCharacter(updatedSheet)
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
  }, [])

  const updateBackendSheet = async () => {
    console.log("Updating Backend Sheet")
    console.log(character)
    setCharacterPreUpdate({...characterPreUpdate, id: character.id})
  }

  useEffect(() => {
    const sendSheetUpdate = async () => {
      console.log(characterPreUpdate)
      const updatedToken = await API.graphql({
        query: mutations.updateCharacterSheet,
        variables: {input: {...characterPreUpdate}}
      })
      console.log(updatedToken)
      await setCharacterPreUpdate({})
    }

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

    const {name, value} = e.target;
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


  const handleInputBlur = () => {
    // Perform backend update here
    // You can access the updated character sheet using 'editableCharacterSheet'
    if (characterPreUpdate) {
      console.log('Sending update to the backend after input blur');
      updateBackendSheet()
    }
  };

  const handleCheckboxClick = (e) => {
    setCharacterPreUpdate({...characterPreUpdate, [name]: !character[e.target.name]})
    handleInputBlur()
    console.log(e.target.name)
    // updateBackendSheet()
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
    // updateBackendSheet()
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
    // updateBackendSheet()
  }

  const addAttunement = () => {
    return null
  }

  const addAttack = () => {
    setCharacter({
      ...character,
      attacks: character.attacks.concat({name: "", notes: "", attack_bonus: 0, damage_dice: "", damage_type: ""})
    })
    // updateBackendSheet()
  }

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
    const input = {
      messageType: "ATTACK",
      abilityName: attack.name,
      d20mod: attack.attack_bonus,
      damageDice: [{diceString: attack.damage_dice, damageType: attack.damage_type}],
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
  }

  if (character) {
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
                                                                  onChange={handleInputChange}
                                                                  onBlur={handleInputBlur}/>
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
                <AbilityScores key={"Charisma"} character={character} rollCheck={rollCheck}
                               handleInputChange={handleInputChange} handleInputBlur={handleInputBlur}/>
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
                  <Saves character={character} rollCheck={rollCheck} handleInputChange={handleInputChange}
                         handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}/>
                  <div className={styles.label}>
                    Saving Throws
                  </div>
                </div>
                <div className={styles.skills + " " + styles.listSection + " " + styles.box}>
                  <Skills character={character} rollCheck={rollCheck} handleInputChange={handleInputChange}
                          handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}/>
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
                  <label form="ac">Armor Class</label><input name="ac" placeholder={"10"} type="text"
                                                             value={character.ac}
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
                <label form="save_notes">Saving Throw Notes</label><textarea className={styles.textarea}
                                                                             name="save_notes"
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
                    Damage String
                  </th>
                  <th>
                    Damage Type
                  </th>
                  <th colSpan={2}>
                    Notes
                  </th>
                </tr>
                </thead>
                <tbody id="attacktable">
                {character.attacks.map((attack, index) => (
                  <AttackRow key={index} attack={attack} index={index} handleInputChange={handleInputChange}
                             handleInputBlur={handleInputBlur} rollAttack={rollAttack}/>
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
                  <td><input name="spell_slots_1" type="text" value={character.spell_slots_1}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_2" type="text" value={character.spell_slots_2}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_3" type="text" value={character.spell_slots_3}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_4" type="text" value={character.spell_slots_4}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_5" type="text" value={character.spell_slots_5}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_6" type="text" value={character.spell_slots_6}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_7" type="text" value={character.spell_slots_7}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_8" type="text" value={character.spell_slots_8}
                             onChange={handleInputChange}
                             onBlur={handleInputBlur}/></td>
                  <td><input name="spell_slots_9" type="text" value={character.spell_slots_9}
                             onChange={handleInputChange}
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
                  <SpellRow key={index} spell={attack} index={index} handleInputChange={handleInputChange}
                            handleInputBlur={handleInputBlur} handleCheckboxClick={handleCheckboxClick}/>
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

}

export default CharacterSheet
