/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const parseMessage = /* GraphQL */ `
  mutation ParseMessage($input: ParseMessageInput!) {
    parseMessage(input: $input) {
      id
      __typename
    }
  }
`;
export const createNewGame = /* GraphQL */ `
  mutation CreateNewGame($input: CreateNewGameInput!) {
    createNewGame(input: $input) {
      id
      __typename
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
          owner
          messageType
          advantage
          disadvantage
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
          positionX
          positionY
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
      activeSong
      songQueue {
        game {
          id
          name
          dms
          activeMap
          gameMode
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
          __typename
        }
        playlistName
        songs
        id
        createdAt
        updatedAt
        songQueueGameId
        __typename
      }
      createdAt
      updatedAt
      userGamesId
      gameSongQueueId
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
          owner
          messageType
          advantage
          disadvantage
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
          positionX
          positionY
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
      activeSong
      songQueue {
        game {
          id
          name
          dms
          activeMap
          gameMode
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
          __typename
        }
        playlistName
        songs
        id
        createdAt
        updatedAt
        songQueueGameId
        __typename
      }
      createdAt
      updatedAt
      userGamesId
      gameSongQueueId
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
          owner
          messageType
          advantage
          disadvantage
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
          positionX
          positionY
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
      activeSong
      songQueue {
        game {
          id
          name
          dms
          activeMap
          gameMode
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
          __typename
        }
        playlistName
        songs
        id
        createdAt
        updatedAt
        songQueueGameId
        __typename
      }
      createdAt
      updatedAt
      userGamesId
      gameSongQueueId
      __typename
    }
  }
`;
export const createSongQueue = /* GraphQL */ `
  mutation CreateSongQueue(
    $input: CreateSongQueueInput!
    $condition: ModelSongQueueConditionInput
  ) {
    createSongQueue(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      playlistName
      songs
      id
      createdAt
      updatedAt
      songQueueGameId
      __typename
    }
  }
`;
export const updateSongQueue = /* GraphQL */ `
  mutation UpdateSongQueue(
    $input: UpdateSongQueueInput!
    $condition: ModelSongQueueConditionInput
  ) {
    updateSongQueue(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      playlistName
      songs
      id
      createdAt
      updatedAt
      songQueueGameId
      __typename
    }
  }
`;
export const deleteSongQueue = /* GraphQL */ `
  mutation DeleteSongQueue(
    $input: DeleteSongQueueInput!
    $condition: ModelSongQueueConditionInput
  ) {
    deleteSongQueue(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      playlistName
      songs
      id
      createdAt
      updatedAt
      songQueueGameId
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      owner
      messageType
      advantage
      disadvantage
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      owner
      messageType
      advantage
      disadvantage
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      owner
      messageType
      advantage
      disadvantage
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
      createdAt
      updatedAt
      gamePlayersId
      userPlayersId
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
      createdAt
      updatedAt
      gamePlayersId
      userPlayersId
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
      createdAt
      updatedAt
      gamePlayersId
      userPlayersId
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
      tokens {
        items {
          imageURL
          layer
          width
          height
          rotation
          positionX
          positionY
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
export const updateMap = /* GraphQL */ `
  mutation UpdateMap(
    $input: UpdateMapInput!
    $condition: ModelMapConditionInput
  ) {
    updateMap(input: $input, condition: $condition) {
      tokens {
        items {
          imageURL
          layer
          width
          height
          rotation
          positionX
          positionY
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
export const deleteMap = /* GraphQL */ `
  mutation DeleteMap(
    $input: DeleteMapInput!
    $condition: ModelMapConditionInput
  ) {
    deleteMap(input: $input, condition: $condition) {
      tokens {
        items {
          imageURL
          layer
          width
          height
          rotation
          positionX
          positionY
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
export const createToken = /* GraphQL */ `
  mutation CreateToken(
    $input: CreateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    createToken(input: $input, condition: $condition) {
      map {
        tokens {
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
          __typename
        }
        token {
          imageURL
          layer
          width
          height
          rotation
          positionX
          positionY
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
      imageURL
      layer
      width
      height
      rotation
      positionX
      positionY
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
export const updateToken = /* GraphQL */ `
  mutation UpdateToken(
    $input: UpdateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    updateToken(input: $input, condition: $condition) {
      map {
        tokens {
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
          __typename
        }
        token {
          imageURL
          layer
          width
          height
          rotation
          positionX
          positionY
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
      imageURL
      layer
      width
      height
      rotation
      positionX
      positionY
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
export const deleteToken = /* GraphQL */ `
  mutation DeleteToken(
    $input: DeleteTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    deleteToken(input: $input, condition: $condition) {
      map {
        tokens {
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
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
          activeSong
          createdAt
          updatedAt
          userGamesId
          gameSongQueueId
          __typename
        }
        token {
          imageURL
          layer
          width
          height
          rotation
          positionX
          positionY
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
      imageURL
      layer
      width
      height
      rotation
      positionX
      positionY
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
export const createPing = /* GraphQL */ `
  mutation CreatePing(
    $input: CreatePingInput!
    $condition: ModelPingConditionInput
  ) {
    createPing(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      positionX
      positionY
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
export const updatePing = /* GraphQL */ `
  mutation UpdatePing(
    $input: UpdatePingInput!
    $condition: ModelPingConditionInput
  ) {
    updatePing(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      positionX
      positionY
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
export const deletePing = /* GraphQL */ `
  mutation DeletePing(
    $input: DeletePingInput!
    $condition: ModelPingConditionInput
  ) {
    deletePing(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
        __typename
      }
      positionX
      positionY
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
export const createCharacterSheet = /* GraphQL */ `
  mutation CreateCharacterSheet(
    $input: CreateCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    createCharacterSheet(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
        imageURL
        layer
        width
        height
        rotation
        positionX
        positionY
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
export const updateCharacterSheet = /* GraphQL */ `
  mutation UpdateCharacterSheet(
    $input: UpdateCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    updateCharacterSheet(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
        imageURL
        layer
        width
        height
        rotation
        positionX
        positionY
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
export const deleteCharacterSheet = /* GraphQL */ `
  mutation DeleteCharacterSheet(
    $input: DeleteCharacterSheetInput!
    $condition: ModelCharacterSheetConditionInput
  ) {
    deleteCharacterSheet(input: $input, condition: $condition) {
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
        activeSong
        songQueue {
          playlistName
          songs
          id
          createdAt
          updatedAt
          songQueueGameId
          __typename
        }
        createdAt
        updatedAt
        userGamesId
        gameSongQueueId
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
        imageURL
        layer
        width
        height
        rotation
        positionX
        positionY
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
