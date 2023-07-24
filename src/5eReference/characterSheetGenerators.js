const getExampleCharacter = (playerId, gameId) => {
  return ({
    gameCharacterSheetsId: gameId,
    // characterSheetTokenId: ID
    owner: playerId ? playerId : "NoPlayer",
    players: [playerId ? playerId : "NoPlayer"],
    // game: gameId,
    name: "Zathror Wilke",
    class_level: "Warlock 1",
    background: "Gladiator",
    player_name: "Ryan",
    race: "Aasimar",
    alignment: "chaotic good",
    xp: 100,
    inspiration: 1,
    proficiency_bonus: 2,
    ac: 15,
    armor_desc: "natural armor",
    max_hp: 243,
    death_success_1: true,
    death_success_2: true,
    death_success_3: false,
    death_fail_1: true,
    death_fail_2: true,
    death_fail_3: false,
    current_hp: 120,
    total_hd: "18d12+126",
    current_hd: 12,
    temp_hp: 10,
    speed: "30ft",
    strength_score: 10,
    dexterity_score: 12,
    constitution_score: 9,
    intelligence_score: 17,
    wisdom_score: 13,
    charisma_score: 21,
    strength_save_mod: 0,
    dexterity_save_mod: 2,
    constitution_save_mod: 6,
    intelligence_save_mod: 1,
    wisdom_save_mod: 2,
    charisma_save_mod: 11,
    strength_save_prof: false,
    dexterity_save_prof: true,
    constitution_save_prof: false,
    intelligence_save_prof: true,
    wisdom_save_prof: false,
    charisma_save_prof: true,
    passive_perception: 12,
    passive_investigation: 13,
    passive_insight: 9,
    acrobatics_prof: true,
    animal_handling_prof: false,
    arcana_prof: true,
    athletics_prof: false,
    deception_prof: true,
    history_prof: false,
    insight_prof: true,
    intimidation_prof: false,
    investigation_prof: true,
    medicine_prof: false,
    nature_prof: true,
    perception_prof: false,
    performance_prof: true,
    persuasion_prof: false,
    religion_prof: true,
    sleight_of_hand_prof: false,
    stealth_prof: true,
    survival_prof: false,
    acrobatics_mod: 0,
    animal_handling_mod: 1,
    arcana_mod: 2,
    athletics_mod: 3,
    deception_mod: 4,
    history_mod: 5,
    insight_mod: 6,
    intimidation_mod: 7,
    investigation_mod: 8,
    medicine_mod: 9,
    nature_mod: 10,
    perception_mod: 11,
    performance_mod: 12,
    persuasion_mod: 13,
    religion_mod: 14,
    sleight_of_hand_mod: 15,
    stealth_mod: 16,
    survival_mod: 17,
    initiative: 0,
    defenses: "Resistant to radiant and necrotic",
    senses: "blindsight 60 ft., darkvision 120 ft.",
    save_notes: "Advantage on wisdom saves",
    movement: "Fly 60 ft.",
    other_profs: "Land Vehicles\n Celestial",
    attacks: [],
    attack_notes: "My attack notes",
    spell_slots_1: 1,
    spell_slots_2: 2,
    spell_slots_3: 3,
    spell_slots_4: 4,
    spell_slots_5: 5,
    spell_slots_6: 6,
    spell_slots_7: 7,
    spell_slots_8: 8,
    spell_slots_9: 9,
    spell_slots_max_1: 1,
    spell_slots_max_2: 2,
    spell_slots_max_3: 3,
    spell_slots_max_4: 4,
    spell_slots_max_5: 5,
    spell_slots_max_6: 6,
    spell_slots_max_7: 7,
    spell_slots_max_8: 8,
    spell_slots_max_9: 9,
    pact_level: 10,
    pact_available: 2,
    pact_maximum: 3,
    spells: [],
    spells_notes: "Zathror is the greatest spellcaster in the world.",
    weight_carried: 12,
    weight_capacity: 13,
    encumberance_notes: "Encumberance Notes here",
    pp: 1,
    gp: 2,
    ep: 3,
    sp: 4,
    cp: 12,
    attuned_magic_items: [],
    attunement_notes: "I don't have any attunement notes",
    inventory: [],
    inventory_notes: "Inventory isn't a concern",
    features_left: "Features 1",
    features_center: "Features 2",
    features_right: "Features 3",
    gender: "male",
    age: "Old",
    height: "6'2\"",
    weight: "10 lbs",
    faith: "Heretic",
    skin: "pale",
    eyes: "brown",
    hair: "black",
    organizations: "Wings of hope",
    backstory: "Unknown",
    personality: "the best dude",
    ideals: "Freedom",
    bonds: "His friends",
    flaws: "Absolutely none",
    notes_left: "Notes 1",
    notes_center: "Notes 2",
    notes_right: "Notes 3"
  })
}

export {getExampleCharacter}