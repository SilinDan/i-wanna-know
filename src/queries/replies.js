import gql from 'graphql-tag';

export const GET_REPLIES = gql`
  query RepliesQuery($answerId: ID!) {
    replies: RepliesQuery(answerId: $answerId) {
      list {
        _id
        repliedUser {
          id
          name
        }
        user {
          id
          name
        }
        content
        createdTime
      }
      total
    }
  }
`;