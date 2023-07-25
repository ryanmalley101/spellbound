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

const GRAPHQL_ENDPOINT = process.env.API_SPELLBOUND_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const {Sha256} = crypto;


const createUserQuery = `
    mutation CreateUser($input: CreateUserInput!) {
      createUser( input: $input ) {
        id
      }
    }
  `;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 200
  // const inputs = event.arguments.input
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

  console.log(event)

  const userVariables = {
    input: {
      id: event.request.userAttributes.sub,
      username: event.userName,
      email: event.request.userAttributes.email
    }
  };


  const userResponse = await sendMutation(createUserQuery, userVariables)

  console.log("User Response")
  console.log(userResponse)

  context.succeed(event);
}