/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      owner {
        id
        email
        username
        players {
          nextToken
          __typename
        }
        games {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      messageList {
        items {
          id
          gameId
          owner
          messageType
          advantage
          damageDice
          damageDiceResults
          rolls
          abilityName
          saveAbility
          saveScore
          messageText
          diceString
          placeholder
          createdAt
          updatedAt
          gameMessageListId
          __typename
        }
        nextToken
        __typename
      }
      dms
      players {
        items {
          id
          name
          createdAt
          updatedAt
          gamePlayersId
          userPlayersId
          __typename
        }
        nextToken
        __typename
      }
      maps {
        items {
          sizeX
          sizeY
          name
          id
          createdAt
          updatedAt
          gameMapsId
          __typename
        }
        nextToken
        __typename
      }
      activeMap
      characterSheets {
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
          __typename
        }
        nextToken
        __typename
      }
      pings {
        items {
          x
          y
          scale
          ttl
          id
          createdAt
          updatedAt
          gamePingsId
          __typename
        }
        nextToken
        __typename
      }
      gameMode
      activeSong {
        title
        url
        __typename
      }
      songPlaying
      songQueue {
        title
        url
        __typename
      }
      paused
      createdAt
      updatedAt
      userGamesId
      __typename
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        messageList {
          nextToken
          __typename
        }
        dms
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap
        characterSheets {
          nextToken
          __typename
        }
        pings {
          nextToken
          __typename
        }
        gameMode
        activeSong {
          title
          url
          __typename
        }
        songPlaying
        songQueue {
          title
          url
          __typename
        }
        paused
        createdAt
        updatedAt
        userGamesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      players {
        items {
          id
          name
          createdAt
          updatedAt
          gamePlayersId
          userPlayersId
          __typename
        }
        nextToken
        __typename
      }
      games {
        items {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        username
        players {
          nextToken
          __typename
        }
        games {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!, $createdAt: AWSDateTime!) {
    getMessage(id: $id, createdAt: $createdAt) {
      id
      game {
        id
        name
        owner {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        messageList {
          nextToken
          __typename
        }
        dms
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap
        characterSheets {
          nextToken
          __typename
        }
        pings {
          nextToken
          __typename
        }
        gameMode
        activeSong {
          title
          url
          __typename
        }
        songPlaying
        songQueue {
          title
          url
          __typename
        }
        paused
        createdAt
        updatedAt
        userGamesId
        __typename
      }
      gameId
      owner
      messageType
      advantage
      damageDice
      damageDiceResults
      rolls
      abilityName
      saveAbility
      saveScore
      messageText
      diceString
      placeholder
      createdAt
      updatedAt
      gameMessageListId
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $id: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMessages(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        gameId
        owner
        messageType
        advantage
        damageDice
        damageDiceResults
        rolls
        abilityName
        saveAbility
        saveScore
        messageText
        diceString
        placeholder
        createdAt
        updatedAt
        gameMessageListId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messageByGameAndCreatedAt = /* GraphQL */ `
  query MessageByGameAndCreatedAt(
    $gameId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messageByGameAndCreatedAt(
      gameId: $gameId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        gameId
        owner
        messageType
        advantage
        damageDice
        damageDiceResults
        rolls
        abilityName
        saveAbility
        saveScore
        messageText
        diceString
        placeholder
        createdAt
        updatedAt
        gameMessageListId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      name
      game {
        id
        name
        owner {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        messageList {
          nextToken
          __typename
        }
        dms
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap
        characterSheets {
          nextToken
          __typename
        }
        pings {
          nextToken
          __typename
        }
        gameMode
        activeSong {
          title
          url
          __typename
        }
        songPlaying
        songQueue {
          title
          url
          __typename
        }
        paused
        createdAt
        updatedAt
        userGamesId
        __typename
      }
      user {
        id
        email
        username
        players {
          nextToken
          __typename
        }
        games {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      rulers {
        items {
          id
          points
          createdAt
          updatedAt
          playerRulersId
          mapRulersId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      gamePlayersId
      userPlayersId
      __typename
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        user {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        rulers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        gamePlayersId
        userPlayersId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMap = /* GraphQL */ `
  query GetMap($id: ID!) {
    getMap(id: $id) {
      tokens {
        items {
          owner
          type
          imageURL
          points
          radius
          layer
          fill
          stroke
          text
          fontSize
          width
          height
          rotation
          x
          y
          key
          id
          createdAt
          updatedAt
          mapTokensId
          tokenCharacterId
          __typename
        }
        nextToken
        __typename
      }
      rulers {
        items {
          id
          points
          createdAt
          updatedAt
          playerRulersId
          mapRulersId
          __typename
        }
        nextToken
        __typename
      }
      sizeX
      sizeY
      name
      game {
        id
        name
        owner {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        messageList {
          nextToken
          __typename
        }
        dms
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap
        characterSheets {
          nextToken
          __typename
        }
        pings {
          nextToken
          __typename
        }
        gameMode
        activeSong {
          title
          url
          __typename
        }
        songPlaying
        songQueue {
          title
          url
          __typename
        }
        paused
        createdAt
        updatedAt
        userGamesId
        __typename
      }
      id
      createdAt
      updatedAt
      gameMapsId
      __typename
    }
  }
`;
export const listMaps = /* GraphQL */ `
  query ListMaps(
    $filter: ModelMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        tokens {
          nextToken
          __typename
        }
        rulers {
          nextToken
          __typename
        }
        sizeX
        sizeY
        name
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        id
        createdAt
        updatedAt
        gameMapsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getToken = /* GraphQL */ `
  query GetToken($id: ID!) {
    getToken(id: $id) {
      map {
        tokens {
          nextToken
          __typename
        }
        rulers {
          nextToken
          __typename
        }
        sizeX
        sizeY
        name
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        id
        createdAt
        updatedAt
        gameMapsId
        __typename
      }
      character {
        owner
        players
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        token {
          owner
          type
          imageURL
          points
          radius
          layer
          fill
          stroke
          text
          fontSize
          width
          height
          rotation
          x
          y
          key
          id
          createdAt
          updatedAt
          mapTokensId
          tokenCharacterId
          __typename
        }
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
          __typename
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
          __typename
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
          __typename
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
          __typename
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
          __typename
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
        __typename
      }
      owner
      type
      imageURL
      points
      radius
      layer
      fill
      stroke
      text
      fontSize
      width
      height
      rotation
      x
      y
      key
      id
      createdAt
      updatedAt
      mapTokensId
      tokenCharacterId
      __typename
    }
  }
`;
export const listTokens = /* GraphQL */ `
  query ListTokens(
    $filter: ModelTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        map {
          sizeX
          sizeY
          name
          id
          createdAt
          updatedAt
          gameMapsId
          __typename
        }
        character {
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
          __typename
        }
        owner
        type
        imageURL
        points
        radius
        layer
        fill
        stroke
        text
        fontSize
        width
        height
        rotation
        x
        y
        key
        id
        createdAt
        updatedAt
        mapTokensId
        tokenCharacterId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPing = /* GraphQL */ `
  query GetPing($id: ID!) {
    getPing(id: $id) {
      game {
        id
        name
        owner {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        messageList {
          nextToken
          __typename
        }
        dms
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap
        characterSheets {
          nextToken
          __typename
        }
        pings {
          nextToken
          __typename
        }
        gameMode
        activeSong {
          title
          url
          __typename
        }
        songPlaying
        songQueue {
          title
          url
          __typename
        }
        paused
        createdAt
        updatedAt
        userGamesId
        __typename
      }
      x
      y
      scale
      ttl
      id
      createdAt
      updatedAt
      gamePingsId
      __typename
    }
  }
`;
export const listPings = /* GraphQL */ `
  query ListPings(
    $filter: ModelPingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        x
        y
        scale
        ttl
        id
        createdAt
        updatedAt
        gamePingsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRuler = /* GraphQL */ `
  query GetRuler($id: ID!) {
    getRuler(id: $id) {
      id
      points
      map {
        tokens {
          nextToken
          __typename
        }
        rulers {
          nextToken
          __typename
        }
        sizeX
        sizeY
        name
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        id
        createdAt
        updatedAt
        gameMapsId
        __typename
      }
      player {
        id
        name
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        user {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        rulers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        gamePlayersId
        userPlayersId
        __typename
      }
      createdAt
      updatedAt
      playerRulersId
      mapRulersId
      __typename
    }
  }
`;
export const listRulers = /* GraphQL */ `
  query ListRulers(
    $filter: ModelRulerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRulers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        points
        map {
          sizeX
          sizeY
          name
          id
          createdAt
          updatedAt
          gameMapsId
          __typename
        }
        player {
          id
          name
          createdAt
          updatedAt
          gamePlayersId
          userPlayersId
          __typename
        }
        createdAt
        updatedAt
        playerRulersId
        mapRulersId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCharacterSheet = /* GraphQL */ `
  query GetCharacterSheet($id: ID!) {
    getCharacterSheet(id: $id) {
      owner
      players
      game {
        id
        name
        owner {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        messageList {
          nextToken
          __typename
        }
        dms
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap
        characterSheets {
          nextToken
          __typename
        }
        pings {
          nextToken
          __typename
        }
        gameMode
        activeSong {
          title
          url
          __typename
        }
        songPlaying
        songQueue {
          title
          url
          __typename
        }
        paused
        createdAt
        updatedAt
        userGamesId
        __typename
      }
      token {
        map {
          sizeX
          sizeY
          name
          id
          createdAt
          updatedAt
          gameMapsId
          __typename
        }
        character {
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
          __typename
        }
        owner
        type
        imageURL
        points
        radius
        layer
        fill
        stroke
        text
        fontSize
        width
        height
        rotation
        x
        y
        key
        id
        createdAt
        updatedAt
        mapTokensId
        tokenCharacterId
        __typename
      }
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
        __typename
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
        __typename
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
          __typename
        }
        __typename
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
        damage {
          damage_dice
          damage_type
          __typename
        }
        cast_time
        range_shape
        duration
        components
        notes
        __typename
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
        __typename
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
      __typename
    }
  }
`;
export const listCharacterSheets = /* GraphQL */ `
  query ListCharacterSheets(
    $filter: ModelCharacterSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacterSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        owner
        players
        game {
          id
          name
          dms
          activeMap
          gameMode
          songPlaying
          paused
          createdAt
          updatedAt
          userGamesId
          __typename
        }
        token {
          owner
          type
          imageURL
          points
          radius
          layer
          fill
          stroke
          text
          fontSize
          width
          height
          rotation
          x
          y
          key
          id
          createdAt
          updatedAt
          mapTokensId
          tokenCharacterId
          __typename
        }
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
          __typename
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
          __typename
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
          __typename
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
          __typename
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
          __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMonsterStatblock = /* GraphQL */ `
  query GetMonsterStatblock($id: ID!, $ownerId: String!) {
    getMonsterStatblock(id: $id, ownerId: $ownerId) {
      id
      ownerId
      name
      createdAt
      updatedAt
      desc
      size
      type
      subtype
      group
      alignment
      armor_class
      armor_desc
      current_hit_points
      hit_points
      hit_dice_num
      hit_dice
      speed {
        walk
        swim
        fly
        climb
        burrow
        hover
        notes
        __typename
      }
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
      strength_save
      dexterity_save
      constitution_save
      intelligence_save
      wisdom_save
      charisma_save
      save_proficiencies
      perception
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
        __typename
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
        __typename
      }
      damage_vulnerabilities
      damage_vulnerability_list
      damage_resistances
      damage_resistance_list
      damage_immunities
      damage_immunity_list
      condition_immunities
      condition_immunity_list
      blindsight
      blindBeyond
      darkvision
      tremorsense
      truesight
      senses
      languages
      challenge_rating
      cr
      special_abilities {
        name
        desc
        __typename
      }
      actions {
        name
        desc
        effect
        type
        attack_bonus
        reach
        short_range
        long_range
        damage {
          damage_dice
          damage_type
          __typename
        }
        targets
        __typename
      }
      bonus_actions {
        name
        desc
        __typename
      }
      reactions {
        name
        desc
        __typename
      }
      legendary_desc
      legendary_actions {
        name
        desc
        __typename
      }
      mythic_desc
      mythic_actions {
        name
        desc
        __typename
      }
      __typename
    }
  }
`;
export const listMonsterStatblocks = /* GraphQL */ `
  query ListMonsterStatblocks(
    $id: ID
    $ownerId: ModelStringKeyConditionInput
    $filter: ModelMonsterStatblockFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMonsterStatblocks(
      id: $id
      ownerId: $ownerId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        ownerId
        name
        createdAt
        updatedAt
        desc
        size
        type
        subtype
        group
        alignment
        armor_class
        armor_desc
        current_hit_points
        hit_points
        hit_dice_num
        hit_dice
        speed {
          walk
          swim
          fly
          climb
          burrow
          hover
          notes
          __typename
        }
        strength
        dexterity
        constitution
        intelligence
        wisdom
        charisma
        strength_save
        dexterity_save
        constitution_save
        intelligence_save
        wisdom_save
        charisma_save
        save_proficiencies
        perception
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
          __typename
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
          __typename
        }
        damage_vulnerabilities
        damage_vulnerability_list
        damage_resistances
        damage_resistance_list
        damage_immunities
        damage_immunity_list
        condition_immunities
        condition_immunity_list
        blindsight
        blindBeyond
        darkvision
        tremorsense
        truesight
        senses
        languages
        challenge_rating
        cr
        special_abilities {
          name
          desc
          __typename
        }
        actions {
          name
          desc
          effect
          type
          attack_bonus
          reach
          short_range
          long_range
          targets
          __typename
        }
        bonus_actions {
          name
          desc
          __typename
        }
        reactions {
          name
          desc
          __typename
        }
        legendary_desc
        legendary_actions {
          name
          desc
          __typename
        }
        mythic_desc
        mythic_actions {
          name
          desc
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
