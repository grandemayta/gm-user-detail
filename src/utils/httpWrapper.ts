import { getGraphQLRequest } from '../utils/utils';

export async function httpWrapper(nickname: string) {
    const response = await fetch('https://nestjs-graphql.herokuapp.com/graphql', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: getGraphQLRequest(nickname)
    });
    const json = await response.json();
    return  json.data.user;
}