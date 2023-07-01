const {DataStore} = require("@aws-amplify/datastore");
const {Game} = require("@/models");

async function createGameWithMap({input}) {
  const {name, mapName} = input;
  const game = Game
  try {
    const [game, map] = await DataStore.transaction(async () => {
      const createdGame = await DataStore.save(new Game({name}));
      const createdMap = await DataStore.save(new Map({name: mapName, gameID: createdGame.id}));
      return [createdGame, createdMap];
    });

    return {game, map};
  } catch (error) {
    console.error("Error creating game with map:", error);
    throw error;
  }
}

module.exports = {createGameWithMap};