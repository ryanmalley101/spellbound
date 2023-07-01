/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      owner {
        game {
          name
          id
          createdAt
          updatedAt
          gameOwnerId
          gameActiveMapId
          gameActiveMapCreatedAt
          __typename
        }
        userPlayers {
          nextToken
          __typename
        }
        id
        createdAt
        updatedAt
        gameDmsId
        gamePlayersId
        userPlayersId
        playerGameId
        owner
        playerID
        gameID
        __typename
      }
      name
      messageList {
        items {
          id
          owner
          message
          timestamp
          createdAt
          updatedAt
          gameMessageListId
          __typename
        }
        nextToken
        __typename
      }
      dms {
        items {
          id
          createdAt
          updatedAt
          gameDmsId
          gamePlayersId
          userPlayersId
          playerGameId
          owner
          playerID
          gameID
          __typename
        }
        nextToken
        __typename
      }
      players {
        items {
          id
          createdAt
          updatedAt
          gameDmsId
          gamePlayersId
          userPlayersId
          playerGameId
          owner
          playerID
          gameID
          __typename
        }
        nextToken
        __typename
      }
      maps {
        items {
          id
          createdAt
          name
          updatedAt
          gameMapsId
          __typename
        }
        nextToken
        __typename
      }
      activeMap {
        id
        createdAt
        tokens {
          nextToken
          __typename
        }
        backgroundTokens {
          nextToken
          __typename
        }
        gmTokens {
          nextToken
          __typename
        }
        name
        updatedAt
        gameMapsId
        __typename
      }
      characterSheets {
        items {
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
          attacks
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
          spells
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
          inventory
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
          players
          gameID
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
      id
      createdAt
      updatedAt
      gameOwnerId
      gameActiveMapId
      gameActiveMapCreatedAt
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
        owner {
          id
          createdAt
          updatedAt
          gameDmsId
          gamePlayersId
          userPlayersId
          playerGameId
          owner
          playerID
          gameID
          __typename
        }
        name
        messageList {
          nextToken
          __typename
        }
        dms {
          nextToken
          __typename
        }
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap {
          id
          createdAt
          name
          updatedAt
          gameMapsId
          __typename
        }
        characterSheets {
          nextToken
          __typename
        }
        id
        createdAt
        updatedAt
        gameOwnerId
        gameActiveMapId
        gameActiveMapCreatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserPlayer = /* GraphQL */ `
  query GetUserPlayer($id: ID!) {
    getUserPlayer(id: $id) {
      id
      user {
        id
        email
        username
        players {
          nextToken
          __typename
        }
        userPlayers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      player {
        game {
          name
          id
          createdAt
          updatedAt
          gameOwnerId
          gameActiveMapId
          gameActiveMapCreatedAt
          __typename
        }
        userPlayers {
          nextToken
          __typename
        }
        id
        createdAt
        updatedAt
        gameDmsId
        gamePlayersId
        userPlayersId
        playerGameId
        owner
        playerID
        gameID
        __typename
      }
      createdAt
      updatedAt
      playerUserPlayersId
      userUserPlayersId
      __typename
    }
  }
`;
export const listUserPlayers = /* GraphQL */ `
  query ListUserPlayers(
    $filter: ModelUserPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          email
          username
          createdAt
          updatedAt
          __typename
        }
        player {
          id
          createdAt
          updatedAt
          gameDmsId
          gamePlayersId
          userPlayersId
          playerGameId
          owner
          playerID
          gameID
          __typename
        }
        createdAt
        updatedAt
        playerUserPlayersId
        userUserPlayersId
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
      game {
        owner {
          id
          createdAt
          updatedAt
          gameDmsId
          gamePlayersId
          userPlayersId
          playerGameId
          owner
          playerID
          gameID
          __typename
        }
        name
        messageList {
          nextToken
          __typename
        }
        dms {
          nextToken
          __typename
        }
        players {
          nextToken
          __typename
        }
        maps {
          nextToken
          __typename
        }
        activeMap {
          id
          createdAt
          name
          updatedAt
          gameMapsId
          __typename
        }
        characterSheets {
          nextToken
          __typename
        }
        id
        createdAt
        updatedAt
        gameOwnerId
        gameActiveMapId
        gameActiveMapCreatedAt
        __typename
      }
      userPlayers {
        items {
          id
          createdAt
          updatedAt
          playerUserPlayersId
          userUserPlayersId
          __typename
        }
        nextToken
        __typename
      }
      id
      createdAt
      updatedAt
      gameDmsId
      gamePlayersId
      userPlayersId
      playerGameId
      owner
      playerID
      gameID
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
        game {
          name
          id
          createdAt
          updatedAt
          gameOwnerId
          gameActiveMapId
          gameActiveMapCreatedAt
          __typename
        }
        userPlayers {
          nextToken
          __typename
        }
        id
        createdAt
        updatedAt
        gameDmsId
        gamePlayersId
        userPlayersId
        playerGameId
        owner
        playerID
        gameID
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
          createdAt
          updatedAt
          gameDmsId
          gamePlayersId
          userPlayersId
          playerGameId
          owner
          playerID
          gameID
          __typename
        }
        nextToken
        __typename
      }
      userPlayers {
        items {
          id
          createdAt
          updatedAt
          playerUserPlayersId
          userUserPlayersId
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
        userPlayers {
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
  query GetMessage($id: ID!, $timestamp: AWSTimestamp!) {
    getMessage(id: $id, timestamp: $timestamp) {
      id
      owner
      message
      timestamp
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
    $timestamp: ModelIntKeyConditionInput
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMessages(
      id: $id
      timestamp: $timestamp
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        owner
        message
        timestamp
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
export const getMap = /* GraphQL */ `
  query GetMap($id: ID!, $createdAt: AWSDateTime!) {
    getMap(id: $id, createdAt: $createdAt) {
      id
      createdAt
      tokens {
        items {
          imageURL
          scaleX
          scaleY
          rotation
          positionX
          positionY
          id
          createdAt
          updatedAt
          mapTokensId
          mapTokensCreatedAt
          mapBackgroundTokensId
          mapBackgroundTokensCreatedAt
          mapGmTokensId
          mapGmTokensCreatedAt
          __typename
        }
        nextToken
        __typename
      }
      backgroundTokens {
        items {
          imageURL
          scaleX
          scaleY
          rotation
          positionX
          positionY
          id
          createdAt
          updatedAt
          mapTokensId
          mapTokensCreatedAt
          mapBackgroundTokensId
          mapBackgroundTokensCreatedAt
          mapGmTokensId
          mapGmTokensCreatedAt
          __typename
        }
        nextToken
        __typename
      }
      gmTokens {
        items {
          imageURL
          scaleX
          scaleY
          rotation
          positionX
          positionY
          id
          createdAt
          updatedAt
          mapTokensId
          mapTokensCreatedAt
          mapBackgroundTokensId
          mapBackgroundTokensCreatedAt
          mapGmTokensId
          mapGmTokensCreatedAt
          __typename
        }
        nextToken
        __typename
      }
      name
      updatedAt
      gameMapsId
      __typename
    }
  }
`;
export const listMaps = /* GraphQL */ `
  query ListMaps(
    $id: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelMapFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMaps(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        tokens {
          nextToken
          __typename
        }
        backgroundTokens {
          nextToken
          __typename
        }
        gmTokens {
          nextToken
          __typename
        }
        name
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
      imageURL
      scaleX
      scaleY
      rotation
      positionX
      positionY
      id
      createdAt
      updatedAt
      mapTokensId
      mapTokensCreatedAt
      mapBackgroundTokensId
      mapBackgroundTokensCreatedAt
      mapGmTokensId
      mapGmTokensCreatedAt
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
        imageURL
        scaleX
        scaleY
        rotation
        positionX
        positionY
        id
        createdAt
        updatedAt
        mapTokensId
        mapTokensCreatedAt
        mapBackgroundTokensId
        mapBackgroundTokensCreatedAt
        mapGmTokensId
        mapGmTokensCreatedAt
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
      attacks
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
      spells
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
      inventory
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
      players
      gameID
      token {
        imageURL
        scaleX
        scaleY
        rotation
        positionX
        positionY
        id
        createdAt
        updatedAt
        mapTokensId
        mapTokensCreatedAt
        mapBackgroundTokensId
        mapBackgroundTokensCreatedAt
        mapGmTokensId
        mapGmTokensCreatedAt
        __typename
      }
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
        attacks
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
        spells
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
        inventory
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
        players
        gameID
        token {
          imageURL
          scaleX
          scaleY
          rotation
          positionX
          positionY
          id
          createdAt
          updatedAt
          mapTokensId
          mapTokensCreatedAt
          mapBackgroundTokensId
          mapBackgroundTokensCreatedAt
          mapGmTokensId
          mapGmTokensCreatedAt
          __typename
        }
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
