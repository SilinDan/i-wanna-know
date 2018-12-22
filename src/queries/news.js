import gql from 'graphql-tag';

export const GET_NEWS = gql`
  query NewsQuery($userId: ID!, $page: Int) {
    news: NewsQuery(userId: $userId, page: $page) {
      list {
        _id
        type
        user {
          id
          name
          group
        }
        time

        ... on QuestionNews {
          question {
            _id
            title
            preview
          }
        }

        ... on AnswerNews {
          answer {
            _id
            preview
            question {
              _id
              title
            }
          }
        }

        ... on FollowNews {
          followedUser {
            id
            name
          }
        }
      }
      total
    }
  }
`;

export const GET_FOLLOWED_NEWS = gql`
  query FollowedNewsQuery($page: Int) {
    news: FollowedNewsQuery(page: $page) {
      list {
        type
        time
        user {
          id
          name
          group
        }

        ... on QuestionNews {
          question {
            _id
            title
            preview
          }
        }

        ... on AnswerNews {
          answer {
            _id
            preview
            question {
              _id
              title
            }
          }
        }
      }
      total
    }
  }
`;

export const GET_FOLLOWED_QUESTION_NEWS = gql`
  query FollowedQuestionNewsQuery($page: Int) {
    news: FollowedQuestionNewsQuery(page: $page) {
      list {
        type
        time
        user {
          id
          name
          group
        }

        ... on QuestionNews {
          question {
            _id
            title
            preview
          }
        }

        ... on AnswerNews {
          answer {
            _id
            preview
            question {
              _id
              title
            }
          }
        }
      }
      total
    }
  }
`;