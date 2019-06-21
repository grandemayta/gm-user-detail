export function getGraphQLRequest(nickname: string) {
  return JSON.stringify({ 
    query: `{ user(login: "${nickname}") { login name company bio avatar_url, location } }`
  });
}