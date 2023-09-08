/* Amplify Params - DO NOT EDIT
	API_SPELLBOUND_GRAPHQLAPIENDPOINTOUTPUT
	API_SPELLBOUND_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import {defaultProvider} from '@aws-sdk/credential-provider-node';
import {SignatureV4} from '@aws-sdk/signature-v4';
import {HttpRequest} from '@aws-sdk/protocol-http';
import {default as fetch, Request} from 'node-fetch';
import {DiceRoller, exportFormats} from '@dice-roller/rpg-dice-roller';

const GRAPHQL_ENDPOINT = process.env.API_SPELLBOUND_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const {Sha256} = crypto;

const query = `
    mutation CreateMessage($input: CreateMessageInput!) {
      createMessage( input: $input ) {
                id
                gameMessageListId
                gameId
                createdAt
                updatedAt
                messageType
                owner
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
      }
    }
  `;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const roller = new DiceRoller();

  const {
    owner,
    messageType,
    messageText,
    abilityName,
    d20mod,
    saveAbility,
    saveScore,
    advantage,
    damageDice,
    gameMessageListId,
  } = event.arguments.input

  const messageInput = {owner, messageType, gameMessageListId, advantage, messageText, gameId: gameMessageListId}

  if (messageType === "ATTACK") {
    messageInput.abilityName = abilityName
    messageInput.damageDice = JSON.stringify(damageDice)
    const damageDiceResults = []
    damageDice.map((damage) => {
      const dieResult = {}
      dieResult.damageType = damage.damageType
      dieResult.diceString = damage.diceString
      const cleanedDiceString = damage.diceString.replace('D', 'd')
      dieResult.rolls = roller.roll(`${cleanedDiceString}`).export(exportFormats.OBJECT)
      damageDiceResults.push(dieResult)
    })
    messageInput.damageDiceResults = JSON.stringify(damageDiceResults)
    const roll1 = roller.roll(`1d20+${d20mod}`)
    const roll2 = roller.roll(`1d20+${d20mod}`)
    messageInput.rolls = JSON.stringify({rolls: [roll1.export(exportFormats.OBJECT), roll2.export(exportFormats.OBJECT)]})
  } else if (messageType === "SAVEDC") {
    messageInput.abilityName = abilityName
    messageInput.saveAbility = saveAbility
    messageInput.saveScore = saveScore
    messageInput.messageText = messageText
  } else if (messageType === "ABILITY") {
    messageInput.abilityName = abilityName
    messageInput.messageText = messageText
  } else if (messageType === "CHECK") {
    messageInput.abilityName = abilityName
    const roll1 = roller.roll(`1d20+${d20mod}`)
    const roll2 = roller.roll(`1d20+${d20mod}`)
    messageInput.rolls = JSON.stringify({rolls: [roll1.export(exportFormats.OBJECT), roll2.export(exportFormats.OBJECT)]})
  } else if (messageType === "DICEROLL") {
    const roll = roller.roll(messageText)
    console.log(roll.export(exportFormats.OBJECT))
    messageInput.rolls = JSON.stringify(roll.export(exportFormats.OBJECT))
  } else if (messageType === "CHAT") {
    messageInput.messageText = messageText
  } else {
    console.log("No valid messagetype found")

    return {
      statusCode: 500,
      //  Uncomment below to enable CORS requests
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*"
      // },
      body: JSON.stringify({error: "Invalid Message Type"})
    };
  }
  console.log({...messageInput})
  const variables = {input: {...messageInput}}

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({query: query, variables: variables}),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;


  try {
    response = await fetch(request);
    body = await response.json();
    console.log("Mutation Response Body")
    console.log(body)
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  const messageId = body.data.createMessage.id

  return {
    statusCode,
    id: messageId,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify({body})
  };
};