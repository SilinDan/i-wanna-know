import gql from 'graphql-tag';

export const GET_TOKEN = gql`
  query TokenQuery($token: String!) {
    token: TokenQuery(token: $token)
  }
`;