/* Amplify Params - DO NOT EDIT
	API_SPELLBOUND_GRAPHQLAPIENDPOINTOUTPUT
	API_SPELLBOUND_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = event => {
  event.Records.forEach(async record => {
    if (record.eventName === 'REMOVE') {
      try {
        await removeRecordDependencies(record);
      } catch (err) {
        console.log(err);
      }
    }
  });

  const graphqlRun = require('/opt/graphQlRun.js');

  const tokensByMapID = /* GraphQL */ `
      query ($mapID: ID, $nextToken: String) {
          tokensByMapId (mapID: $mapID) {
              items (nextToken: $nextToken) {
                  id
              }
              nextToken
          }
      }
  `;

  const deleteToken = /* GraphQL */ `
      mutation DeleteToken(
          $input: DeleteTokenInput!
      ) {
          deleteToken(input: $input, condition: $condition) {
              id
          }
      }
  `;

// recursive function to list all posts from a blog
  const listTokens = (id, nextToken = null, items = []) =>
    new Promise((resolve, reject) => {
      graphqlRun(tokensByMapID, {
        mapID: id,
        nextToken: nextToken,
      })
        .then(result => {
          let posts = result.data.tokensByMapID;
          items = [...items, ...posts.items];

          if (posts.nextToken) {
            listTokens(id, posts.nextToken, items)
              .then(result => resolve(result))
              .catch(err => reject(err));
          } else {
            resolve(items);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });

  async function removeRecordDependencies(record) {
    let mapId = record.dynamodb.OldImage.id.S;

    let tokens = await listTokens(mapId);

    for (let token of tokens) {
      await graphqlRun(deleteToken, {
        input: {
          id: token.id,
        }
      });
    }
  }

  return Promise.resolve('Successfully processed DynamoDB record');

};
