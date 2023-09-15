import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {useEffect, useState} from "react";
import srdlist from "@/components/gameComponents/srdlist";
import {getMonsterProf, scoreToMod} from "@/5eReference/converters";
import MonsterSheet from "@/components/gameComponents/monstersheet";
import {listCharacterSheets} from "@/graphql/queries";

const query = `
  query ListCharacterSheets(
    $filter: ModelCharacterSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacterSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        owner
        players
        name
        class_level
        background
        player_name
        race
        alignment
        xp
        inspiration
        proficiency_bonus
        ac
        armor_desc
        max_hp
        death_success_1
        death_success_2
        death_success_3
        death_fail_1
        death_fail_2
        death_fail_3
        current_hp
        total_hd
        current_hd
        temp_hp
        speed
        strength
        dexterity
        constitution
        intelligence
        wisdom
        charisma
        strength_score
        dexterity_score
        constitution_score
        intelligence_score
        wisdom_score
        charisma_score
        strength_save_mod
        dexterity_save_mod
        constitution_save_mod
        intelligence_save_mod
        wisdom_save_mod
        charisma_save_mod
        strength_save_prof
        dexterity_save_prof
        constitution_save_prof
        intelligence_save_prof
        wisdom_save_prof
        charisma_save_prof
        skills {
          acrobatics
          animal_handling
          arcana
          athletics
          deception
          history
          insight
          intimidation
          investigation
          medicine
          nature
          perception
          performance
          persuasion
          religion
          sleight_of_hand
          stealth
          survival
        }
        skill_proficiencies {
          acrobatics
          animal_handling
          arcana
          athletics
          deception
          history
          insight
          intimidation
          investigation
          medicine
          nature
          perception
          performance
          persuasion
          religion
          sleight_of_hand
          stealth
          survival
        }
        save_proficiencies
        passive_perception
        passive_investigation
        passive_insight
        acrobatics_prof
        animal_handling_prof
        arcana_prof
        athletics_prof
        deception_prof
        history_prof
        insight_prof
        intimidation_prof
        investigation_prof
        medicine_prof
        nature_prof
        perception_prof
        performance_prof
        persuasion_prof
        religion_prof
        sleight_of_hand_prof
        stealth_prof
        survival_prof
        acrobatics_mod
        animal_handling_mod
        arcana_mod
        athletics_mod
        deception_mod
        history_mod
        insight_mod
        intimidation_mod
        investigation_mod
        medicine_mod
        nature_mod
        perception_mod
        performance_mod
        persuasion_mod
        religion_mod
        sleight_of_hand_mod
        stealth_mod
        survival_mod
        initiative
        defenses
        senses
        save_notes
        movement
        other_profs
        attacks {
            name
            notes
            attack_bonus
            damage {
              damage_dice
              damage_type
            }
        }
        attack_notes
        spell_slots_1
        spell_slots_2
        spell_slots_3
        spell_slots_4
        spell_slots_5
        spell_slots_6
        spell_slots_7
        spell_slots_8
        spell_slots_9
        spell_slots_max_1
        spell_slots_max_2
        spell_slots_max_3
        spell_slots_max_4
        spell_slots_max_5
        spell_slots_max_6
        spell_slots_max_7
        spell_slots_max_8
        spell_slots_max_9
        pact_level
        pact_available
        pact_maximum
        sp_maximum
        sp_available
        spells {
          is_prepared
          is_concentration
          is_ritual
          is_attack
          name
          level
          source
          save_ability
          attack_save
          cast_time
          range_shape
          duration
          components
          notes
        }
        spells_notes
        weight_carried
        weight_capacity
        encumberance_notes
        pp
        gp
        ep
        sp
        cp
        attuned_magic_items
        attunement_notes
        inventory {
          equipped
          name
          count
          weight
          value
          notes
        }
        inventory_notes
        features_left
        features_center
        features_right
        gender
        age
        height
        weight
        faith
        skin
        eyes
        hair
        organizations
        backstory
        personality
        ideals
        bonds
        flaws
        notes_left
        notes_center
        notes_right
        id
        createdAt
        updatedAt
        gameCharacterSheetsId
        characterSheetTokenId
      }
      nextToken
      __typename
    }
  }
`;


const ConvertSRDMonsters = () => {
    const [convertedList, setConvertedList] = useState([])

    const convertSheet = async (sheet) => {
        const newSheet = {...sheet}
        newSheet.strength = newSheet.dexterity_score
        newSheet.dexterity = newSheet.dexterity_score
        newSheet.constitution = newSheet.constitution_score
        newSheet.intelligence = newSheet.intelligence_score
        newSheet.wisdom = newSheet.wisdom_score
        newSheet.charisma = newSheet.charisma_score
        newSheet.skills = {
            acrobatics: newSheet.acrobatics_mod,
            animal_handling: newSheet.animal_handling_mod,
            arcana: newSheet.arcana_mod,
            athletics: newSheet.athletics_mod,
            deception: newSheet.deception_mod,
            history: newSheet.history_mod,
            insight: newSheet.insight_mod,
            intimidation: newSheet.intimidation_mod,
            investigation: newSheet.investigation_mod,
            medicine: newSheet.medicine_mod,
            nature: newSheet.nature_mod,
            perception: newSheet.perception_mod,
            performance: newSheet.performance_mod,
            persuasion: newSheet.persuasion_mod,
            religion: newSheet.religion_mod,
            sleight_of_hand: newSheet.sleight_of_hand_mod,
            stealth: newSheet.stealth_mod,
            survival: newSheet.survival_mod,
        }
        newSheet.skill_proficiencies = {
            acrobatics: newSheet.acrobatics_prof ? "proficient" : "",
            animal_handling: newSheet.animal_handling_prof ? "proficient" : "",
            arcana: newSheet.arcana_prof ? "proficient" : "",
            athletics: newSheet.athletics_prof ? "proficient" : "",
            deception: newSheet.deception_prof ? "proficient" : "",
            history: newSheet.history_prof ? "proficient" : "",
            insight: newSheet.insight_prof ? "proficient" : "",
            intimidation: newSheet.intimidation_prof ? "proficient" : "",
            investigation: newSheet.investigation_prof ? "proficient" : "",
            medicine: newSheet.medicine_prof ? "proficient" : "",
            nature: newSheet.nature_prof ? "proficient" : "",
            perception: newSheet.perception_prof ? "proficient" : "",
            performance: newSheet.performance_prof ? "proficient" : "",
            persuasion: newSheet.persuasion_prof ? "proficient" : "",
            religion: newSheet.religion_prof ? "proficient" : "",
            sleight_of_hand: newSheet.sleight_of_hand_prof ? "proficient" : "",
            stealth: newSheet.stealth_prof ? "proficient" : "",
            survival: newSheet.survival_prof ? "proficient" : "",
        }
        newSheet.save_proficiencies = []
        if (newSheet.strength_save_prof) newSheet.save_proficiencies.push("strength")
        if (newSheet.dexterity_save_prof) newSheet.save_proficiencies.push("dexterity")
        if (newSheet.constitution_save_prof) newSheet.save_proficiencies.push("constitution")
        if (newSheet.intelligence_save_prof) newSheet.save_proficiencies.push("intelligence")
        if (newSheet.wisdom_save_prof) newSheet.save_proficiencies.push("wisdom")
        if (newSheet.charisma_save_prof) newSheet.save_proficiencies.push("charisma")
        delete newSheet.__typename
        delete newSheet.createdAt
        delete newSheet.updatedAt
        //
        // delete newSheet.acrobatics_prof
        // delete newSheet.animal_handling_prof
        // delete newSheet.arcana_prof
        // delete newSheet.athletics_prof
        // delete newSheet.deception_prof
        // delete newSheet.history_prof
        // delete newSheet.insight_prof
        // delete newSheet.intimidation_prof
        // delete newSheet.investigation_prof
        // delete newSheet.medicine_prof
        // delete newSheet.nature_prof
        // delete newSheet.perception_prof
        // delete newSheet.performance_prof
        // delete newSheet.persuasion_prof
        // delete newSheet.religion_prof
        // delete newSheet.sleight_of_hand_prof
        // delete newSheet.stealth_prof
        // delete newSheet.survival_prof
        // delete newSheet.acrobatics_mod
        // delete newSheet.animal_handling_mod
        // delete newSheet.arcana_mod
        // delete newSheet.athletics_mod
        // delete newSheet.deception_mod
        // delete newSheet.history_mod
        // delete newSheet.insight_mod
        // delete newSheet.intimidation_mod
        // delete newSheet.investigation_mod
        // delete newSheet.medicine_mod
        // delete newSheet.nature_mod
        // delete newSheet.perception_mod
        // delete newSheet.performance_mod
        // delete newSheet.persuasion_mod
        // delete newSheet.religion_mod
        // delete newSheet.sleight_of_hand_mod
        // delete newSheet.stealth_mod
        // delete newSheet.survival_mod

        console.log(newSheet)
        const updatedSheet = await API.graphql({
            query: mutations.updateCharacterSheet,
            variables: {input: newSheet},
        });
        console.log(updatedSheet);
    }

    useEffect(() => {
        const getSheets = async () => {
            const response = await API.graphql({
                query: query
                // variables: {input},
            });

            response.data.listCharacterSheets.items.map((sheet) => {
                convertSheet(sheet)
            })
        }
        getSheets()
    }, [])

    return (
        <div>
            <h1>
                Convert Character Sheets
            </h1>
            <div>
                {convertedList.map((sheet, i) => {
                    return <div key={monster.name + i}>
                        {sheet.name}
                    </div>
                })}
            </div>
        </div>
    )
}

export default ConvertSRDMonsters