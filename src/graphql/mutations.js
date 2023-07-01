/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
export const createUserPlayer = /* GraphQL */ `
  mutation CreateUserPlayer(
    $input: CreateUserPlayerInput!
    $condition: ModelUserPlayerConditionInput
  ) {
    createUserPlayer(input: $input, condition: $condition) {
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
export const updateUserPlayer = /* GraphQL */ `
  mutation UpdateUserPlayer(
    $input: UpdateUserPlayerInput!
    $condition: ModelUserPlayerConditionInput
  ) {
    updateUserPlayer(input: $input, condition: $condition) {
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
export const deleteUserPlayer = /* GraphQL */ `
  mutation DeleteUserPlayer(
    $input: DeleteUserPlayerInput!
    $condition: ModelUserPlayerConditionInput
  ) {
    deleteUserPlayer(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createMap = /* GraphQL */ `
  mutation CreateMap(
    $input: CreateMapInput!
    $condition: ModelMapConditionInput
  ) {
    createMap(input: $input, condition: $condition) {
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
export const updateMap = /* GraphQL */ `
  mutation UpdateMap(
    $input: UpdateMapInput!
    $condition: ModelMapConditionInput
  ) {
    updateMap(input: $input, condition: $condition) {
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
export const deleteMap = /* GraphQL */ `
  mutation DeleteMap(
    $input: DeleteMapInput!
    $condition: ModelMapConditionInput
  ) {
    deleteMap(input: $input, condition: $condition) {
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
export const createToken = /* GraphQL */ `
  mutation CreateToken(
    $input: CreateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    createToken(input: $input, condition: $condition) {
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
export const updateToken = /* GraphQL */ `
  mutation UpdateToken(
    $input: UpdateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    updateToken(input: $input, condition: $condition) {
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
export const deleteToken = /* GraphQL */ `
  mutation DeleteToken(
    $input: DeleteTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    deleteToken(input: $input, condition: $condition) {
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
export const createCharacterSheet = /* GraphQL */ `
  mutation CreateCharacterSheet(
    $input: CreateCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    createCharacterSheet(input: $input, condition: $condition) {
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
export const updateCharacterSheet = /* GraphQL */ `
  mutation UpdateCharacterSheet(
    $input: UpdateCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    updateCharacterSheet(input: $input, condition: $condition) {
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
export const deleteCharacterSheet = /* GraphQL */ `
  mutation DeleteCharacterSheet(
    $input: DeleteCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    deleteCharacterSheet(input: $input, condition: $condition) {
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
