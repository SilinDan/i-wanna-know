import gql from 'graphql-tag';

export const GET_ANSWERS = gql`
  query AnswersQuery($questionId: ID!) {
    answers: AnswersQuery(questionId: $questionId) {
      list {
        _id
        user {
          id
          name
          icon
          group
        }
        content
        createdTime
        updatedTime
      }
    }
  }
`;