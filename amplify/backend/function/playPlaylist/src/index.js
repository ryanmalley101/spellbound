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

const query = /* GraphQL */ `
    query LIST_TODOS {
        listTodos {
            items {
                id
                name
                description
            }
        }
    }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 200;

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

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify(body)
  };
};