import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from '@/styles/CreateMonsterStatblock.module.css';
import {
    Button, ButtonGroup,
    FormControl, InputAdornment, InputLabel, ListSubheader,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import MonsterSheet from "@/components/gameComponents/monstersheet";
import {scoreToMod, getMonsterProf} from "@/5eReference/converters";
import ActionRow from "@/components/creatorComponents/actionrow";
import AbilityRow from "@/components/creatorComponents/abilityrow";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {getMonsterStatblock, listMonsterStatblocks} from "@/graphql/queries";
import {AiOutlineSearch} from "react-icons/ai";
import html2canvas from "html2canvas";

const HeaderRow = ({monster, setMonster, downloadFile}) => {
    const containsText = (text, searchText) =>
        text.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || searchText === '';

    const newMonster = () => {
        setMonster(newMonsterStats)
    }

    const [selectedOption, setSelectedOption] = useState('');
    const [monsterList, setMonsterList] = useState([{name: 'No Monsters Found', slug: 'No Monsters Found'}])
    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () => monsterList.filter((option) => containsText(option.name, searchText)),
        [searchText]
    )

    useEffect(() => {
        const variables = {
            filter: {ownerId: {eq: "spellbound"}}, // Use the appropriate filter condition
        };
        const getMonsterList = async () => {
            try {
                API.graphql(graphqlOperation(listMonsterStatblocks, variables))
                    .then((result) => {
                        console.log(result.data.listMonsterStatblocks.items);
                        setMonsterList(result.data.listMonsterStatblocks.items)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (e) {
                console.error(e)
            }
        }

        getMonsterList()
    }, []);

    const saveMonster = async () => {
        const input = {...monster, ownerId: "spellbound"};
        delete input.__typename
        let savedMonster = null

        if (monster.id) {
            console.log("Updating a monster", input)
            try {
                // Call the createMap mutation
                const response = await API.graphql({
                    query: mutations.updateMonsterStatblock,
                    variables: {input: input},
                });
                savedMonster = response.data.updateMonsterStatblock
            } catch (e) {
                console.error("Error update creature:", e);
            }
        } else {
            console.log("Creating a new monster", input)
            try {
                // Call the createMap mutation
                const response = await API.graphql({
                    query: mutations.createMonsterStatblock,
                    variables: {input},
                });
                savedMonster = response.data.createMonsterStatblock
            } catch (e) {
                console.error("Error creating creature:", e);
            }
        }

        if (savedMonster) {
            console.log("Saved monster", savedMonster)
            setMonster(cleanMonster(savedMonster))
        }
    }

    // Get rid of __typenames just so I can stick with the auto generated mutations
    const cleanMonster = (m) => {
        delete m.__typename
        delete m.speed.__typename
        delete m.skills.__typename
        delete m.skill_proficiencies.__typename
        m.special_abilities = m.special_abilities.map((ability) => {
            delete ability.__typename
            return ability
        })
        m.actions = m.actions.map((action) => {
            delete action.__typename
            return action
        })
        m.reactions = m.reactions.map((ability) => {
            delete ability.__typename
            return ability
        })
        m.bonus_actions = m.bonus_actions.map((ability) => {
            delete ability.__typename
            return ability
        })
        m.legendary_actions = m.legendary_actions.map((ability) => {
            delete ability.__typename
            return ability
        })
        m.mythic_actions = m.mythic_actions.map((ability) => {
            delete ability.__typename
            return ability
        })
        delete m.updatedAt
        return m
    }

    const exportJSON = () => {
        const fileName = "my-file";
        const json = JSON.stringify(monster.monster, null, 2);
        const blob = new Blob([json], {type: "application/json"});
        const href = URL.createObjectURL(blob);

        // create "a" HTML element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const handleSelectionChange = async (e) => {
        setSelectedOption(e.target.value)
    }

    const getMonster = async (id) => {
        console.log(id)
        if (id) {
            try {
                const existingMonster = await API.graphql({
                    query: getMonsterStatblock,
                    variables: {id: id, ownerId: "spellbound"},
                });
                setMonster(cleanMonster(existingMonster.data.getMonsterStatblock))
            } catch (e) {
                console.error(e)
            }
        }
    }


    return <div className={styles.stickyHeader}>
        <Button variant={"contained"} style={{marginRight: "10px"}} onClick={newMonster}>New</Button>
        <Button variant={"contained"} onClick={saveMonster}>Save</Button>
        <FormControl style={{left: "30%", minWidth: "200px"}}>
            <InputLabel id="search-select-label" style={{color: "white"}}>Monster Name</InputLabel>
            <Select
                // Disables auto focus on MenuItems and allows TextField to be in focus
                MenuProps={{autoFocus: false}}
                labelId="search-select-label"
                id="search-select"
                value={selectedOption}
                label="Monsters"
                onChange={handleSelectionChange}
                onClose={() => setSearchText("")}
                // This prevents rendering empty string in Select's value
                // if search text would exclude currently selected option.
                renderValue={() => selectedOption}
                style={{backgroundColor: "#1976d2"}}
            >
                {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                <ListSubheader>
                    <TextField
                        size="small"
                        // Autofocus on textfield
                        autoFocus
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AiOutlineSearch/>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                                // Prevents autoselecting item while typing (default Select behaviour)
                                e.stopPropagation();
                            }
                        }}
                    />
                </ListSubheader>
                {displayedOptions.map((option, i) => (
                    <MenuItem key={`${option.id}-${i}`} value={option.name} onClick={() => getMonster(option.id)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button variant={"contained"} style={{float: "right"}} onClick={exportJSON}>Export JSON</Button>
        <Button variant={"contained"} style={{marginRight: "10px", float: "right"}} onClick={downloadFile}>Download
            PNG</Button>

    </div>
}

const newMonsterStats = {
    name: 'Knight',
    desc: '',
    size: 'medium',
    type: 'humanoid',
    group: "",
    subtype: '',
    alignment: 'lawful good',
    armor_class: 10,
    armor_desc: '',
    hit_points: 10,
    hit_dice: '1d10',
    hit_dice_num: 1,
    speed: {
        walk: 30,
        swim: 0,
        fly: 0,
        burrow: 0,
        climb: 0,
        hover: false,
    },
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    strength_save: 0,
    dexterity_save: 0,
    constitution_save: 0,
    intelligence_save: 0,
    wisdom_save: 0,
    charisma_save: 0,
    save_proficiencies: [],
    perception: 0,
    skills: {},
    skill_proficiencies: {},
    damage_vulnerabilities: '',
    damage_vulnerability_list: [],
    damage_resistances: '',
    damage_resistance_list: [],
    damage_immunities: '',
    damage_immunity_list: [],
    condition_immunities: '',
    condition_immunity_list: [],
    blindsight: 0,
    blindBeyond: false,
    darkvision: 0,
    tremorsense: 0,
    truesight: 0,
    senses: '',
    languages: '',
    challenge_rating: "0",
    cr: 0.0,
    actions: [],
    bonus_actions: [],
    reactions: [],
    legendary_desc: '',
    legendary_actions: [],
    special_abilities: [],
    mythic_desc: '',
    mythic_actions: [],
}

const CreateMonsterStatblock = (monster) => {
    const [monsterStatblock, setMonsterStatblock] = useState(newMonsterStats);

    const [selectedSave, setSelectedSave] = useState("strength")
    const [saveList, setSaveList] = useState([])
    const [selectedSkill, setSelectedSkill] = useState("acrobatics")
    const [skillList, setSkillList] = useState({})
    const [selectedDamage, setSelectedDamage] = useState("acid")
    const [damageVulnerabilityList, setDamageVulnerabilityList] = useState([])
    const [damageResistanceList, setDamageResistanceList] = useState([])
    const [damageImmunityList, setDamageImmunityList] = useState([])
    const [selectedCondition, setSelectedCondition] = useState("blinded")
    const [conditionImmunityList, setConditionImmunityList] = useState([])
    const [specialAbilities, setSpecialAbilities] = useState([])
    const [actions, setActions] = useState([])
    const [bonusActions, setBonusActions] = useState([])
    const [reactions, setReactions] = useState([])
    const [legendaryActions, setLegendaryActions] = useState([])
    const [mythicActions, setMythicActions] = useState([])
    const [hitDieSize, setHitDieSize] = useState("d8")

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setMonsterStatblock({...monsterStatblock, [name]: value});
    };

    const rowSpacing = 1

    const handleSpeedChange = (event) => {
        const {name, value} = event.target;
        setMonsterStatblock({
            ...monsterStatblock,
            speed: {
                ...monsterStatblock.speed,
                [name]: parseInt(value, 10),
            },
        });
    };

    const addSaveProficiency = () => {
        console.log(`Adding save ${selectedSave}`)
        const oldSaves = [...saveList]
        if (!oldSaves.includes(selectedSave)) {
            oldSaves.push(selectedSave)
        }
        setSaveList(oldSaves)
    }

    const removeSaveProficiency = () => {
        setSaveList((saves) => {
            return saves.filter((save) => save !== selectedSave)
        })
    }

    const addDamageResistance = () => {
        const oldDamage = [...damageResistanceList]
        if (!oldDamage.includes(selectedDamage)) {
            oldDamage.push(selectedDamage)
        }
        setDamageResistanceList(oldDamage)
    }

    const addDamageVulnerability = () => {
        const oldDamage = [...damageVulnerabilityList]
        if (!oldDamage.includes(selectedDamage)) {
            oldDamage.push(selectedDamage)
        }
        setDamageVulnerabilityList(oldDamage)
    }

    const addDamageImmunity = () => {
        const oldDamage = [...damageImmunityList]
        if (!oldDamage.includes(selectedDamage)) {
            oldDamage.push(selectedDamage)
        }
        setDamageImmunityList(oldDamage)
    }

    const removeDamage = () => {
        setDamageVulnerabilityList((damageList) => {
            return damageList.filter((damage) => damage !== selectedDamage)
        })
        setDamageResistanceList((damageList) => {
            return damageList.filter((damage) => damage !== selectedDamage)
        })
        setDamageImmunityList((damageList) => {
            return damageList.filter((damage) => damage !== selectedDamage)
        })
    }

    const addSkillProficiency = async (proficient) => {
        const addSkill = async () => {
            const skillExists = monsterStatblock.skill_proficiencies.some((s) => selectedSkill in s)
            if (skillExists) {
                const newSkills = monsterStatblock.skill_proficiencies.map((s) => {
                    if (s.hasOwnProperty(selectedSkill)) {
                        return {[selectedSkill]: proficient}
                    }
                    return s
                })
                setSkillList(newSkills)
            } else {
                console.log("Appending new skill", [...monsterStatblock.skill_proficiencies, {[selectedSkill]: proficient}])
                const newSkills = [...monsterStatblock.skill_proficiencies, {[selectedSkill]: proficient}]
                setSkillList(newSkills)
                console.log(monsterStatblock)
            }
        }
        await addSkill()
        console.log(monsterStatblock)

        const initialValue = ""
    }

    const getPassivePerception = () => {
        Object.entries(monsterStatblock.skill_proficiencies).forEach(([key, val]) => {
            if (!key === "perception") {
                return null
            }
            if (val === "expertise") {
                return monsterStatblock.wisdom + (getMonsterProf(monsterStatblock.cr) * 2)
            }
            return monsterStatblock.wisdom + getMonsterProf(monsterStatblock.cr)
        })
        return 10 + Number(scoreToMod(monsterStatblock.wisdom))
    }

    useEffect(() => {
        const toUpperCase = (word) => {
            return word.charAt(0).toUpperCase()
                + word.slice(1)
        }

        const prof = getMonsterProf(monsterStatblock.cr)

        const strMod = Number(scoreToMod(monsterStatblock.strength))
        const dexMod = Number(scoreToMod(monsterStatblock.dexterity))
        const conMod = Number(scoreToMod(monsterStatblock.constitution))
        const intMod = Number(scoreToMod(monsterStatblock.intelligence))
        const wisMod = Number(scoreToMod(monsterStatblock.wisdom))
        const chaMod = Number(scoreToMod(monsterStatblock.charisma))

        const strSave = saveList.includes("strength") ? strMod + prof : null
        const dexSave = saveList.includes("dexterity") ? dexMod + prof : null
        const conSave = saveList.includes("constitution") ? conMod + prof : null
        const intSave = saveList.includes("intelligence") ? intMod + prof : null
        const wisSave = saveList.includes("wisdom") ? wisMod + prof : null
        const chaSave = saveList.includes("charisma") ? chaMod + prof : null

        const reduceSkills = () => {
            const skillObject = {}
            Object.entries(skillList).forEach(([key, val]) => {
                if (val) {
                    let mod = 0

                    if (val === "proficient") {
                        mod = prof
                    } else if (val === "expertise") {
                        mod = prof * 2
                    } else {
                        console.error(`Invalid skill value for ${skill}: ${val}`)
                    }

                    if (key === "athletics") {
                        skillObject[key] = (strMod + mod)
                    }
                    if (key === "acrobatics" || key === "sleight_of_hand" || key === "stealth")
                        skillObject[key] = (dexMod + mod)
                    if (key === "arcana" || key === "history" || key === "investigation" || key === "nature" || key === "religion") {
                        skillObject[key] = (intMod + mod)
                    }
                    if (key === "animal_handling" || key === "insight" || key === "medicine" || key === "perception" || key === "survival") {
                        skillObject[key] = (wisMod + mod)
                    }
                    if (key === "deception" || key === "intimidation" || key === "performance" || key === "persuasion") {
                        skillObject[key] = (chaMod + mod)
                    }
                }
            })
            return skillObject
        }

        const getSenses = () => {
            let sensesString = ""
            if (monsterStatblock.blindsight !== 0) {
                sensesString += `blindsight ${monsterStatblock.blindsight} ft.,`
            }
            if (monsterStatblock.darkvision !== 0) {
                sensesString += `darkvision ${monsterStatblock.darkvision} ft.,`
            }
            if (monsterStatblock.tremorsense !== 0) {
                sensesString += `tremorsense ${monsterStatblock.tremorsense} ft.,`
            }
            if (monsterStatblock.truesight !== 0) {
                sensesString += `truesight ${monsterStatblock.tremorsense}`
            }
            sensesString += `passive Perception ${getPassivePerception()}`
            return sensesString
        }

        setMonsterStatblock(
            {
                ...monsterStatblock,
                skills: reduceSkills(),
                perception: getPassivePerception(),
                strength_save: strSave,
                dexterity_save: dexSave,
                constitution_save: conSave,
                intelligence_save: intSave,
                wisdom_save: wisSave,
                charisma_save: chaSave,
                condition_immunities: conditionImmunityList.length > 0 ? conditionImmunityList.length.join(", ") : "",
                condition_immunity_list: conditionImmunityList,
                damage_vulnerabilities: damageVulnerabilityList.length > 0 ? damageVulnerabilityList.join(", ") : "",
                damage_vulnerability_list: damageVulnerabilityList,
                damage_resistances: damageResistanceList.length > 0 ? damageResistanceList.join(", ") : "",
                damage_resistance_list: damageResistanceList,
                damage_immunities: damageImmunityList.length > 0 ? damageImmunityList.join(", ") : "",
                damage_immunity_list: damageImmunityList,
                skill_proficiencies: skillList,
                save_proficiencies: saveList,
                special_abilities: specialAbilities,
                senses: getSenses(),
                actions: actions,
                bonus_actions: bonusActions,
                reactions: reactions,
                legendary_actions: legendaryActions,
                mythic_actions: mythicActions
            }
        )
    }, [saveList, skillList, damageVulnerabilityList, damageResistanceList, damageImmunityList,
        conditionImmunityList, specialAbilities, actions, bonusActions, reactions, legendaryActions, mythicActions]);

    useEffect(() => {
        setMonsterStatblock({...monsterStatblock, perception: getPassivePerception()})
    }, [monsterStatblock.wisdom, monsterStatblock.skill_proficiencies]);

    const removeSkillProficiency = () => {
        setSkillList((skills) => {
            return skills.filter((s) => !(selectedSkill in s))
        })
    }

    const addConditionImmunity = () => {
        const oldConditions = [...conditionImmunityList]
        if (!oldConditions.includes(selectedCondition)) {
            console.log(`adding condition immunity ${selectedCondition}`)
            oldConditions.push(selectedCondition)
            setConditionImmunityList(oldConditions)
        }
    }

    const removeConditionImmunity = () => {
        setConditionImmunityList((conditionList) => {
            return conditionList.filter((condition) => condition !== selectedCondition)
        })
    }

    const addSpecialAbility = () => {
        console.log("Adding new special ability")

        setSpecialAbilities((oldAbilities) => {
            return [...oldAbilities, {name: "New Ability", desc: "New Description"}]
        })
    }

    const removeSpecialAbility = (index) => {
        console.log(`Removing special ability ${index}`)
        setSpecialAbilities((oldSpecialAbilities) => {
            return oldSpecialAbilities.filter((action, i) => i !== index)
        })
    }

    const handleSpecialAbilityUpdate = (ability, index) => {
        setSpecialAbilities((oldAbilities) => {
            return oldAbilities.map((oldAbility, oldIndex) => {
                if (oldIndex === index) {
                    return ability
                }
                return oldAbility
            })
        })
    }
    const addAction = () => {
        console.log("Adding new action")

        setActions((oldActions) => {
            return [...oldActions, {
                name: "New Action",
                desc: "Action",
                type: "Melee Weapon Attack",
                reach: 5,
                attack_bonus: "[STR ATK]",
                short_range: 0,
                long_range: 0,
                targets: "One Target.",
                damage: []
            }]
        })
    }

    const removeAction = (index) => {
        console.log(`Removing action ${index}`)
        setActions((oldActions) => {
            return oldActions.filter((action, i) => i !== index)
        })
    }

    const handleActionUpdate = (action, index) => {
        setActions((oldActions) => {
            return oldActions.map((oldAction, oldIndex) => {
                if (oldIndex === index) {
                    return action
                }
                return oldAction
            })
        })
    }

    const addBonusAction = () => {
        console.log("Adding new bonus action")

        setBonusActions((oldBonusActions) => {
            return [...oldBonusActions, {name: "New Bonus Action", desc: "New Description"}]
        })
    }

    const removeBonusAction = (index) => {
        console.log(`Removing bonus action ${index}`)
        setBonusActions((oldBonusActions) => {
            return oldBonusActions.filter((action, i) => i !== index)
        })
    }

    const handleBonusActionUpdate = (bonusAction, index) => {
        setBonusActions((oldBonusActions) => {
            return oldBonusActions.map((oldBonusAction, oldIndex) => {
                if (oldIndex === index) {
                    return bonusAction
                }
                return oldBonusAction
            })
        })
    }

    const addReaction = () => {
        console.log("Adding new reaction")

        setReactions((oldReactions) => {
            return [...oldReactions, {name: "New Reaction", desc: "New Description"}]
        })
    }

    const removeReaction = (index) => {
        console.log(`Removing reaction ${index}`)
        setReactions((oldReactions) => {
            return oldReactions.filter((action, i) => i !== index)
        })
    }

    const handleReactionUpdate = (reaction, index) => {
        setReactions((oldReactions) => {
            return oldReactions.map((oldReaction, oldIndex) => {
                if (oldIndex === index) {
                    return reaction
                }
                return oldReaction
            })
        })
    }

    const addLegendaryAction = () => {
        console.log("Adding new reaction")

        setLegendaryActions((oldLegendaryActions) => {
            return [...oldLegendaryActions, {name: "New Legendary Action", desc: "New Description"}]
        })
    }

    const removeLegendaryAction = (index) => {
        console.log(`Removing legendary action ${index}`)
        setLegendaryActions((oldLegendaryActions) => {
            return oldLegendaryActions.filter((action, i) => i !== index)
        })
    }

    const handleLegendaryActionUpdate = (legendaryAction, index) => {
        setLegendaryActions((oldLegendaryActions) => {
            return oldLegendaryActions.map((oldLegendaryAction, oldIndex) => {
                if (oldIndex === index) {
                    return legendaryAction
                }
                return oldLegendaryAction
            })
        })
    }

    const addMythicAction = () => {
        console.log("Adding new mythic action")

        setMythicActions((oldMythicActions) => {
            return [...oldMythicActions, {name: "New Mythic Action", desc: "New Description"}]
        })
    }

    const removeMythicAction = (index) => {
        console.log(`Removing mythic action ${index}`)
        setMythicActions((oldMythicActions) => {
            return oldMythicActions.filter((action, i) => i !== index)
        })
    }

    const handleMythicActionUpdate = (mythicAction, index) => {
        setMythicActions((oldMythicActions) => {
            return oldMythicActions.map((oldMythicActions, oldIndex) => {
                if (oldIndex === index) {
                    return mythicAction
                }
                return oldMythicActions
            })
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any validation here
        // Send the monsterStatblock object to your backend or store it in state
        console.log(monsterStatblock);
    };

    const handleSizeChange = (e) => {
        console.log("Changing hit dice size", e)
        const size = e.target.value
        setMonsterStatblock({...monsterStatblock, size: size})
        if (size === "tiny") {
            setHitDieSize("d4")
        } else if (size === "small") {
            setHitDieSize("d6")
        } else if (size === "medium") {
            setHitDieSize("d8")
        } else if (size === "large") {
            setHitDieSize("d10")
        } else if (size === "huge") {
            setHitDieSize("d12")
        } else if (size === "gargantuan") {
            setHitDieSize("d20")
        }
    }

    const handleHitDiceChange = (dieNum) => {
        setMonsterStatblock({
            ...monsterStatblock,
            hit_dice_num: dieNum,
            hit_dice: `${dieNum}${hitDieSize}+${dieNum * scoreToMod(monsterStatblock.constitution)}`
        })
    }

    useEffect(() => {
        const calcHitPoints = () => {
            const dieSize = Number(hitDieSize.split("d")[1])
            return (Math.ceil(monsterStatblock.hit_dice_num * (dieSize / 2 + .5) + monsterStatblock.hit_dice_num * scoreToMod(monsterStatblock.constitution)))
        }

        setMonsterStatblock({...monsterStatblock, hit_points: calcHitPoints()})
    }, [monsterStatblock.hit_dice_num, monsterStatblock.constitution])

    useEffect(() => {
        if (monster) {
            setSaveList(monsterStatblock.save_proficiencies)
            setSkillList(monsterStatblock.skill_proficiencies)
            setDamageVulnerabilityList(monsterStatblock.damage_vulnerability_list)
            setDamageResistanceList(monsterStatblock.damage_resistance_list)
            setDamageImmunityList(monsterStatblock.damage_immunity_list)
            setSpecialAbilities(monsterStatblock.special_abilities)
            setActions(monsterStatblock.actions)
            setBonusActions(monsterStatblock.bonus_actions)
            setReactions(monsterStatblock.reactions)
            setLegendaryActions(monsterStatblock.legendary_actions)
            setMythicActions(monsterStatblock.mythic_actions)
            setConditionImmunityList(monsterStatblock.condition_immunity_list)
        }
    }, [monsterStatblock]);

    const printRef = useRef()

    const downloadFile = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);

        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'image.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    }


    return (
        <div style={{minWidth: "1100px"}}>
            <HeaderRow monster={monsterStatblock} setMonster={setMonsterStatblock} downloadFile={downloadFile}/>
            <div style={{margin: "100px"}}>
                <MonsterSheet statblock={monsterStatblock} printRef={printRef} style={{margin: "100px"}}/>
            </div>
            <div className={styles.container}>
                <FormControl onSubmit={handleSubmit} className={styles.form} fullWidth>
                    <Grid container spacing={2} marginY={"10px"}>
                        <Grid xs={3}>
                            <TextField name="name" label="Name"
                                       value={monsterStatblock.name}
                                       onChange={handleInputChange}/>
                        </Grid>
                        <Grid xs={1.5}>
                            <FormControl>
                                <InputLabel id="size-label">Size</InputLabel>
                                <Select
                                    labelId={"size-label"}
                                    id="size"
                                    value={monsterStatblock.size}
                                    label="Size"
                                    onChange={handleSizeChange}
                                >
                                    <MenuItem value="tiny">Tiny</MenuItem>
                                    <MenuItem value="small">Small</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="large">Large</MenuItem>
                                    <MenuItem value="huge">Huge</MenuItem>
                                    <MenuItem value="gargantuan">Gargantuan</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2}>
                            <FormControl>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId={"type-label"}
                                    id="type"
                                    value={monsterStatblock.type}
                                    label="Type"
                                    onChange={(e) => setMonsterStatblock({...monsterStatblock, type: e.target.value})}
                                >
                                    <MenuItem value="aberration">Aberration</MenuItem>
                                    <MenuItem value="beast">Beast</MenuItem>
                                    <MenuItem value="celestial">Celestial</MenuItem>
                                    <MenuItem value="construct">Construct</MenuItem>
                                    <MenuItem value="dragon">Dragon</MenuItem>
                                    <MenuItem value="elemental">Elemental</MenuItem>
                                    <MenuItem value="fey">Fey</MenuItem>
                                    <MenuItem value="fiend">Fiend</MenuItem>
                                    <MenuItem value="giant">Giant</MenuItem>
                                    <MenuItem value="humanoid">Humanoid</MenuItem>
                                    <MenuItem value="monstrosity">Monstrosity</MenuItem>
                                    <MenuItem value="ooze">Ooze</MenuItem>
                                    <MenuItem value="plant">Plant</MenuItem>
                                    <MenuItem value="undead">Undead</MenuItem>
                                    <MenuItem value="ooze">Ooze</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2.5}>
                            <TextField name="subtype" label="Subtype"
                                       value={monsterStatblock.subtype}
                                       onChange={handleInputChange}/>
                        </Grid>
                        <Grid xs={3}>
                            <TextField name="alignment" label="Alignment"
                                       value={monsterStatblock.alignment}
                                       onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing} sx={{alignItems: "center"}}>
                        <Grid xs={1.5}><TextField name="strength" label="Strength" variant="outlined"
                                                  value={monsterStatblock.strength} onChange={handleInputChange}
                                                  type={"number"}/></Grid>
                        <Grid xs={.5}>
                            <Typography variant="h5">
                                {scoreToMod(monsterStatblock.strength)}
                            </Typography>
                        </Grid>
                        <Grid xs={1.5}><TextField name="dexterity" label="Dexterity" variant="outlined"
                                                  value={monsterStatblock.dexterity} onChange={handleInputChange}
                                                  type={"number"}/></Grid>
                        <Grid xs={.5}>
                            <Typography variant="h5">
                                {scoreToMod(monsterStatblock.dexterity)}
                            </Typography>
                        </Grid>
                        <Grid xs={1.5}><TextField name="constitution" label="Constitution"
                                                  variant="outlined"
                                                  value={monsterStatblock.constitution} onChange={handleInputChange}
                                                  type={"number"}/></Grid>
                        <Grid xs={.5}>
                            <Typography variant="h5">
                                {scoreToMod(monsterStatblock.constitution)}
                            </Typography>
                        </Grid>
                        <Grid xs={1.5}><TextField name="intelligence" label="Intelligence"
                                                  variant="outlined"
                                                  value={monsterStatblock.intelligence} onChange={handleInputChange}
                                                  type={"number"}/></Grid>
                        <Grid xs={.5}>
                            <Typography variant="h5">
                                {scoreToMod(monsterStatblock.intelligence)}
                            </Typography>
                        </Grid>
                        <Grid xs={1.5}><TextField name="wisdom" label="Wisdom" variant="outlined"
                                                  value={monsterStatblock.wisdom} onChange={handleInputChange}
                                                  type={"number"}/></Grid>
                        <Grid xs={.5}>
                            <Typography variant="h5">
                                {scoreToMod(monsterStatblock.wisdom)}
                            </Typography>
                        </Grid>
                        <Grid xs={1.5}>
                            <TextField
                                name="charisma" label="Charisma" variant="outlined"
                                value={monsterStatblock.charisma} onChange={handleInputChange}
                                type={"number"}/>
                        </Grid>
                        <Grid xs={.5}>
                            <Typography variant="h5">
                                {scoreToMod(monsterStatblock.charisma)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs><FormControl>
                            <InputLabel id="cr-label">CR</InputLabel>
                            <Select
                                id="cr"
                                value={monsterStatblock.cr}
                                label="CR"
                                labelId={"cr-label"}
                                onChange={(e) => setMonsterStatblock({...monsterStatblock, cr: e.target.value})}
                            >
                                <MenuItem value={0}>0 (0 XP)</MenuItem>
                                <MenuItem value={.25}>1/8 (25 XP)</MenuItem>
                                <MenuItem value={1 / 4}>1/4 (50 XP)</MenuItem>
                                <MenuItem value={1 / 2}>1/2 (100 XP)</MenuItem>
                                <MenuItem value={1}>1 (200 XP)</MenuItem>
                                <MenuItem value={2}>2 (450 XP)</MenuItem>
                                <MenuItem value={3}>3 (700 XP)</MenuItem>
                                <MenuItem value={4}>4 (1,100 XP)</MenuItem>
                                <MenuItem value={5}>5 (1,800 XP)</MenuItem>
                                <MenuItem value={6}>6 (2,300 XP)</MenuItem>
                                <MenuItem value={7}>7 (2,900 XP)</MenuItem>
                                <MenuItem value={8}>8 (3,900 XP)</MenuItem>
                                <MenuItem value={9}>9 (5,000 XP)</MenuItem>
                                <MenuItem value={10}>10 (5,900 XP)</MenuItem>
                                <MenuItem value={11}>11 (7,200 XP)</MenuItem>
                                <MenuItem value={12}>12 (8,400 XP)</MenuItem>
                                <MenuItem value={13}>13 (10,000 XP)</MenuItem>
                                <MenuItem value={14}>14 (11,500 XP)</MenuItem>
                                <MenuItem value={15}>15 (13,000 XP)</MenuItem>
                                <MenuItem value={16}>16 (15,000 XP)</MenuItem>
                                <MenuItem value={17}>17 (18,000 XP)</MenuItem>
                                <MenuItem value={18}>18 (20,000 XP)</MenuItem>
                                <MenuItem value={19}>19 (22,000 XP)</MenuItem>
                                <MenuItem value={20}>20 (25,000 XP)</MenuItem>
                                <MenuItem value={21}>21 (33,000 XP)</MenuItem>
                                <MenuItem value={22}>22 (41,000 XP)</MenuItem>
                                <MenuItem value={23}>23 (50,000 XP)</MenuItem>
                                <MenuItem value={24}>24 (62,000 XP)</MenuItem>
                                <MenuItem value={25}>25 (75,000 XP)</MenuItem>
                                <MenuItem value={26}>26 (90,000 XP)</MenuItem>
                                <MenuItem value={27}>27 (105,000 XP)</MenuItem>
                                <MenuItem value={28}>28 (120,000 XP)</MenuItem>
                                <MenuItem value={29}>29 (135,000 XP)</MenuItem>
                                <MenuItem value={30}>30 (155,000 XP)</MenuItem>
                            </Select>
                        </FormControl></Grid>
                        <Grid xs><TextField name="armor_class" label="Armor Class"
                                            variant="outlined"
                                            value={monsterStatblock.armor_class} type={"number"}
                                            onChange={handleInputChange}/></Grid>
                        <Grid xs><TextField name="armor_desc" label="Armor Desc" variant="outlined"
                                            value={monsterStatblock.armor_desc} onChange={handleInputChange}/></Grid>
                        <Grid xs><TextField name="hit_points" label="Hit Points" variant="outlined"
                                            value={monsterStatblock.hit_points} onChange={handleInputChange}
                                            type={"number"}/></Grid>
                        <Grid xs>
                            <div style={{display: "inline-flex"}}>
                                <TextField name="hit_dice_num" label="Hit Dice" variant="outlined"
                                           value={monsterStatblock.hit_dice_num}
                                           onChange={(e) => handleHitDiceChange(e.target.value)}
                                           type={"number"} style={{width: "70px"}}/>
                                <Typography name="hit_dice_size" variant={"h5"}
                                            style={{position: "relative", top: "11px"}}>{hitDieSize}</Typography>
                            </div>

                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs><TextField name="walk" label="Walk" variant="outlined"
                                            value={monsterStatblock.speed.walk ? monsterStatblock.speed.walk : 0}
                                            onChange={handleSpeedChange}
                                            type={"number"}/></Grid>
                        <Grid xs><TextField name="climb" label="Climb" variant="outlined"
                                            value={monsterStatblock.speed.climb ? monsterStatblock.speed.climb : 0}
                                            onChange={handleSpeedChange}
                                            type={"number"}/></Grid>
                        <Grid xs><TextField name="swim" label="Swim" variant="outlined"
                                            value={monsterStatblock.speed.swim ? monsterStatblock.speed.swim : 0}
                                            onChange={handleSpeedChange} type={"number"}/></Grid>
                        <Grid xs><TextField name="fly" label="Fly" variant="outlined"
                                            value={monsterStatblock.speed.fly} onChange={handleSpeedChange}
                                            type={"number"}/></Grid>
                        <Grid xs><TextField name="burrow" label="Burrow" variant="outlined"
                                            value={monsterStatblock.speed.burrow ? monsterStatblock.speed.burrow : 0}
                                            onChange={handleSpeedChange}
                                            type={"number"}/></Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs><FormControl>
                            <InputLabel id="save-label">Saving Throws</InputLabel>
                            <Select
                                id="type"
                                labelId={"save-label"}
                                value={selectedSave}
                                label="Type"
                                onChange={(e) => setSelectedSave(e.target.value)}
                                style={{width: 157}}
                            >
                                <MenuItem value="strength">Strength</MenuItem>
                                <MenuItem value="dexterity">Dexterity</MenuItem>
                                <MenuItem value="constitution">Constitution</MenuItem>
                                <MenuItem value="intelligence">Intelligence</MenuItem>
                                <MenuItem value="wisdom">Wisdom</MenuItem>
                                <MenuItem value="charisma">Charisma</MenuItem>
                            </Select>
                        </FormControl></Grid>
                        <Grid xs><ButtonGroup>
                            <Button type={"button"} onClick={addSaveProficiency}>Proficient</Button>
                        </ButtonGroup></Grid>
                        <Grid xs><FormControl>
                            <InputLabel id="skill-label">Skills</InputLabel>
                            <Select
                                id="type"
                                labelId={"skill-label"}
                                value={selectedSkill}
                                label="Type"
                                onChange={(e) => setSelectedSkill(e.target.value)}
                                style={{width: 157}}
                            >
                                <MenuItem value="acrobatics">Acrobatics</MenuItem>
                                <MenuItem value="animal_handling">Animal Handling</MenuItem>
                                <MenuItem value="arcana">Arcana</MenuItem>
                                <MenuItem value="athletics">Athletics</MenuItem>
                                <MenuItem value="deception">Deception</MenuItem>
                                <MenuItem value="history">History</MenuItem>
                                <MenuItem value="insight">Insight</MenuItem>
                                <MenuItem value="intimidation">Intimidation</MenuItem>
                                <MenuItem value="investigation">Investigation</MenuItem>
                                <MenuItem value="medicine">Medicine</MenuItem>
                                <MenuItem value="nature">Nature</MenuItem>
                                <MenuItem value="perception">Perception</MenuItem>
                                <MenuItem value="performance">Performance</MenuItem>
                                <MenuItem value="persuasion">Persuasion</MenuItem>
                                <MenuItem value="religion">Religion</MenuItem>
                                <MenuItem value="sleight_of_hand">Sleight of Hand</MenuItem>
                                <MenuItem value="stealth">Stealth</MenuItem>
                                <MenuItem value="survival">Survival</MenuItem>
                            </Select>
                        </FormControl></Grid>
                        <Grid xs><ButtonGroup orientation={"vertical"}>
                            <Button type={"button"}
                                    onClick={() => addSkillProficiency("proficient")}>Proficient</Button>
                            <Button type={"button"} onClick={() => addSkillProficiency("expertise")}>Expertise</Button>
                        </ButtonGroup></Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs>
                            {monsterStatblock.save_proficiencies.map((save) => {
                                return <Button key={save} name={save} onClick={removeSaveProficiency}>{save}</Button>
                            })}
                        </Grid>
                        <Grid xs>
                            {Object.entries(monsterStatblock.skill_proficiencies).map(([key, val]) => {
                                if (val) {
                                    const skillString = `${key} (${val})`
                                    return <Button key={key} name={skill}
                                                   onClick={removeSkillProficiency}>{skillString}</Button>
                                }
                            })}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs><FormControl>
                            <InputLabel id="damage-label">Damage Types</InputLabel>
                            <Select
                                id="type"
                                value={selectedDamage}
                                label="Damage Types"
                                onChange={(e) => setSelectedDamage(e.target.value)}
                                style={{width: 157}}

                            >
                                <MenuItem value="acid">Acid</MenuItem>
                                <MenuItem value="bludgeoning">Bludgeoning</MenuItem>
                                <MenuItem value="cold">Cold</MenuItem>
                                <MenuItem value="fire">Fire</MenuItem>
                                <MenuItem value="force">Force</MenuItem>
                                <MenuItem value="lightning">Lightning</MenuItem>
                                <MenuItem value="necrotic">Necrotic</MenuItem>
                                <MenuItem value="piercing">Piercing</MenuItem>
                                <MenuItem value="poison">Poison</MenuItem>
                                <MenuItem value="psychic">Psychic</MenuItem>
                                <MenuItem value="radiant">Radiant</MenuItem>
                                <MenuItem value="slashing">Slashing</MenuItem>
                                <MenuItem value="thunder">Thunder</MenuItem>
                            </Select>
                        </FormControl></Grid>
                        <Grid xs><ButtonGroup orientation={"vertical"}>
                            <Button type={"button"} onClick={() => addDamageVulnerability()}>Vulnerable</Button>
                            <Button type={"button"} onClick={() => addDamageResistance()}>Resistant</Button>
                            <Button type={"button"} onClick={() => addDamageImmunity()}>Immune</Button>
                        </ButtonGroup></Grid>
                        {/*<div>*/}
                        <Grid xs><FormControl>
                            <InputLabel id="condition-label">Conditions</InputLabel>
                            <Select
                                id="condition_immunities"
                                value={selectedCondition}
                                label="Conditions"
                                labelId={"condition-label"}
                                onChange={(e) => setSelectedCondition(e.target.value)}
                                style={{width: 157}}
                            >
                                <MenuItem value="blinded">Blinded</MenuItem>
                                <MenuItem value="charmed">Charmed</MenuItem>
                                <MenuItem value="deafened">Deafened</MenuItem>
                                <MenuItem value="exhaustion">Exhaustion</MenuItem>
                                <MenuItem value="frightened">Frightened</MenuItem>
                                <MenuItem value="grappled">Grappled</MenuItem>
                                <MenuItem value="incapacitated">Incapacitated</MenuItem>
                                <MenuItem value="invisible">Invisible</MenuItem>
                                <MenuItem value="paralyzed">Paralyzed</MenuItem>
                                <MenuItem value="petrified">Petrified</MenuItem>
                                <MenuItem value="poisoned">Poisoned</MenuItem>
                                <MenuItem value="prone">Prone</MenuItem>
                                <MenuItem value="restrained">Restrained</MenuItem>
                                <MenuItem value="stunned">Stunned</MenuItem>
                                <MenuItem value="unconscious">Unconscious</MenuItem>
                            </Select>
                        </FormControl></Grid>
                        <Grid xs>
                            <ButtonGroup disableElevation>
                                <Button type={"button"} onClick={addConditionImmunity}>Immune</Button>
                            </ButtonGroup>
                        </Grid>
                        {/*</div>*/}
                    </Grid>

                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs>
                            {monsterStatblock.damage_vulnerability_list.map((damage) => {
                                return <Button key={damage} name={damage} onClick={removeDamage}>
                                    {damage} (Vulnerable)
                                </Button>
                            })}
                            {monsterStatblock.damage_resistance_list.map((damage) => {
                                return <Button key={damage} name={damage} onClick={removeDamage}>
                                    {damage} (Resistant)
                                </Button>
                            })}
                            {monsterStatblock.damage_immunity_list.map((damage) => {
                                return <Button key={damage} name={damage} onClick={removeDamage}>
                                    {damage} (Immune)
                                </Button>
                            })}
                        </Grid>
                        <Grid xs>
                            {monsterStatblock.condition_immunity_list.map((condition) => {
                                return <Button key={condition} name={condition} onClick={removeConditionImmunity}>
                                    {condition}
                                </Button>
                            })}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs={4}>
                            <TextField fullWidth name="languages" label="Languages" variant="outlined"
                                       value={monsterStatblock.languages} onChange={handleInputChange}/>
                        </Grid>
                        <Grid xs><TextField name="blindsight" label="Blindsight"
                                            variant="outlined"
                                            value={monsterStatblock.blindsight} onChange={handleInputChange}
                                            type={"number"}/></Grid>
                        <Grid xs><TextField name="darkvision" label="Darkvision"
                                            variant="outlined"
                                            value={monsterStatblock.darkvision} onChange={handleInputChange}
                                            type={"number"}/></Grid>
                        <Grid xs><TextField name="tremorsense" label="Tremorsense"
                                            variant="outlined"
                                            value={monsterStatblock.tremorsense} onChange={handleInputChange}
                                            type={"number"}/></Grid>
                        <Grid xs><TextField name="truesight" label="Truesight"
                                            variant="outlined"
                                            value={monsterStatblock.truesight} onChange={handleInputChange}
                                            type={"number"}/></Grid>
                    </Grid>
                    <div style={{display: "flex"}}>
                        <Typography align={"center"} height={"100%"} padding={"5px"}>
                            Abilities:
                        </Typography>
                        <Button type={"button"} onClick={addSpecialAbility}>New Ability</Button>
                    </div>
                    <Grid xs>
                        {specialAbilities.map((ability, index) => {
                            return <AbilityRow ability={ability} key={ability.name} index={index}
                                               handleAbilityUpdate={handleSpecialAbilityUpdate}
                                               handleAbilityRemove={() => removeSpecialAbility(index)}/>
                        })}
                    </Grid>
                    {/* Actions */}
                    <div style={{display: "flex"}}>
                        <Typography align={"center"} height={"100%"} padding={"5px"}>
                            Actions:
                        </Typography>
                        <Button type={"button"} onClick={addAction}>New Action</Button>
                    </div>
                    {actions.map((action, index) => {
                        return <ActionRow action={action} key={action.name} index={index} monsterData={monsterStatblock}
                                          handleActionUpdate={handleActionUpdate}
                                          handleActionRemove={() => removeAction(index)}/>
                    })}

                    {/* Bonus Actions */}
                    <div style={{display: "flex"}}>
                        <Typography align={"center"} height={"100%"} padding={"5px"}>
                            Bonus Actions:
                        </Typography>
                        <Button type={"button"} onClick={addBonusAction}>New Bonus Action</Button>
                    </div>
                    <div>
                        {bonusActions.map((bonus_action, index) => {
                            return <AbilityRow ability={bonus_action} key={bonus_action.name} index={index}
                                               handleAbilityUpdate={handleBonusActionUpdate}
                                               handleAbilityRemove={() => removeBonusAction(index)}/>
                        })}
                    </div>
                    {/* Reactions */}
                    <div style={{display: "flex"}}>
                        <Typography align={"center"} height={"100%"} padding={"5px"}>
                            Reactions:
                        </Typography>
                        <Button type={"button"} onClick={addReaction}>New Reaction</Button>
                    </div>

                    {reactions.map((reaction, index) => {
                        return <AbilityRow ability={reaction} key={reaction.name} index={index}
                                           handleAbilityUpdate={handleReactionUpdate}
                                           handleAbilityRemove={() => removeReaction(index)}/>
                    })}

                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs>
                            <TextField name="legendary_desc" label="Legendary Description"
                                       variant="outlined"
                                       value={monsterStatblock.legendary_desc} onChange={handleInputChange} multiline
                                       fullWidth/>
                        </Grid>
                    </Grid>
                    <div style={{display: "flex"}}>
                        <Typography align={"center"} height={"100%"} padding={"5px"}>
                            Legendary Actions:
                        </Typography>
                        <Button type={"button"} onClick={addLegendaryAction}>New Legendary Action</Button>
                    </div>

                    {legendaryActions.map((legendary_action, index) => {
                        return <AbilityRow ability={legendary_action} key={legendary_action.name} index={index}
                                           handleAbilityUpdate={handleLegendaryActionUpdate}
                                           handleAbilityRemove={() => removeLegendaryAction(index)}/>
                    })}

                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs>
                            <TextField name="mythic_desc" label="Mythic Description"
                                       variant="outlined"
                                       value={monsterStatblock.mythic_desc} onChange={handleInputChange} multiline
                                       fullWidth/>
                        </Grid>
                    </Grid>
                    <div style={{display: "flex"}}>
                        <Typography align={"center"} height={"100%"} padding={"5px"}>
                            Mythic Actions:
                        </Typography>
                        <Button type={"button"} onClick={addMythicAction}>New Mythic Action</Button>
                    </div>

                    {mythicActions.map((mythic_action, index) => {
                        return <AbilityRow ability={mythic_action} key={mythic_action.name} index={index}
                                           handleAbilityUpdate={handleMythicActionUpdate}
                                           handleAbilityRemove={() => removeMythicAction(index)}/>
                    })}

                    <Grid container spacing={2} marginY={rowSpacing}>
                        <Grid xs>
                            <TextField name="desc" label="Creature Description"
                                       variant="outlined"
                                       value={monsterStatblock.desc} onChange={handleInputChange} multiline fullWidth/>
                        </Grid>
                    </Grid>
                    <Button type="submit" className={styles.button}>Create Statblock</Button>
                </FormControl>
            </div>
        </div>
    );
};

export default CreateMonsterStatblock;
