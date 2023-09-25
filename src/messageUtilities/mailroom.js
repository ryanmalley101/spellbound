import {API} from "aws-amplify";
import {replaceDamageTags} from "@/components/gameComponents/monstersheet";

export const rollCheck = async (name, d20mod, playerID, gameID, advantage) => {
    // Prevent the page from reloading
    const input = {
        messageType: "CHECK",
        abilityName: name,
        d20mod: d20mod,
        owner: playerID,
        gameMessageListId: gameID,
        advantage: advantage
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

    console.log("Ability Response", response)

    return response
}

// Remember to eventually refactor to allow damage dice arrays rather than just one
export const rollAttack = async (attack, playerID, gameID, advantage) => {
    console.log("Rolling Attack")
    console.log(attack)
    // Prevent the page from reloading
    const convertedDamage = attack.damage.map((dice) => {
        return {diceString: replaceDamageTags(dice.damage_dice), damageType: dice.damage_type}
    })
    const input = {
        messageType: "ATTACK",
        abilityName: attack.name,
        d20mod: attack.attack_bonus,
        damageDice: convertedDamage,
        messageText: attack.notes,
        owner: playerID,
        gameMessageListId: gameID,
        gameId: gameID,
        advantage: advantage,
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
    console.log("Attack response", attack)

    return response
}
