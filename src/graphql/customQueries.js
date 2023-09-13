export const listGamesMetadata = /* GraphQL */ `
    query ListGames(
        $filter: ModelGameFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                name
                id
            }
            nextToken
            __typename
        }
    }
`;

export const listMonsterStatblocksByOwnerId = /* GraphQL */ `
    query ListMonsterStatblocks($ownerId: String!) {
        listMonsterStatblocks(ownerId: $ownerId) {
            items {
                id
                name
                ownerId
            }
        }
    }`
