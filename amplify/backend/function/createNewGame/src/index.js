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
// import {createPlayer} from "@/graphql/mutations.js";

const GRAPHQL_ENDPOINT = process.env.API_SPELLBOUND_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const {Sha256} = crypto;

const createGameQuery = `
    mutation CreateGame($input: CreateGameInput!) {
      createGame( input: $input ) {
        id
      }
    }
  `;

const createPlayerQuery = `
    mutation CreatePlayer($input: CreatePlayerInput!) {
      createPlayer( input: $input ) {
        id
      }
    }
  `;

const createMapQuery = `
    mutation CreateMap($input: CreateMapInput!) {
      createMap( input: $input ) {
        id
      }
    }
  `;

const createMessageQuery = `
    mutation CreateMessage($input: CreateMessageInput!) {
      createMessage( input: $input ) {
        id
      }
    }
  `;


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 200
  const inputs = event.arguments.input
  const sendMutation = async (query, variables) => {
    console.log("Mutation Variables")
    console.log(variables)

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

    // let statusCode = 200;
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
    return body
  }

  const gameVariables = {
    input: {
      name: inputs.gameName,
      userGamesId: inputs.ownerId
    }
  };


  const gameResponse = await sendMutation(createGameQuery, gameVariables)
  console.log("Game Response")
  console.log(gameResponse)
  const gameId = gameResponse.data.createGame.id

  const playerVariables = {
    input: {
      name: inputs.username,
      gamePlayersId: gameId,
      userPlayersId: inputs.ownerId,
    }
  };

  const playerResponse = await sendMutation(createPlayerQuery, playerVariables)

  console.log("Player Response")
  console.log(playerResponse)

  const playerId = playerResponse.data.createPlayer.id

  const mapVariables = {
    input: {
      name: 'New Map',
      gameMapsId: gameId,
      sizeX: 25,
      sizeY: 25
    }
  };

  const mapResponse = await sendMutation(createMapQuery, mapVariables)

  console.log("Map Response")
  console.log(mapResponse)

  const messageVariables = {
    input: {
      messageText: 'Welcome to Spellbound Tabletop',
      messageType: "CHAT",
      gameMessageListId: gameId,
      owner: playerId
    }
  };

  const messageResponse = await sendMutation(createMessageQuery, messageVariables)

  console.log("Message Response")
  console.log(messageResponse)

  console.log("Completed output")
  console.log({id: gameResponse.data.createGame.id})

  return {
    statusCode,
    id: gameId,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify({id: gameId})
  };
};