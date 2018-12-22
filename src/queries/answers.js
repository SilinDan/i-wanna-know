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
        likesNum
        isLike
        repliesNum
        createdTime
        updatedTime
      }
    }
  }
`;

export const GET_USER_ANSWERS = gql`
  query UserAnswersQuery($userId: ID!) {
    answers: UserAnswersQuery(userId: $userId) {
      list {
        _id
        user {
          id
          name
          icon
          group
        }
        question {
          _id
          title
        }
        preview
        createdTime
        updatedTime
      }
      total
    }
  }
`;

export const GET_ANSWER = gql`
  query AnswerQuery($_id: ID!) {
    answer: AnswerQuery(_id: $_id) {
      _id
      user {
        id
        name
        icon
        group
      }
      question {
        _id
        title
        content
        preview
        user {
          id
          name
          group
          icon
        }
        classification {
          _id
          name
        }
        view
        createdTime
        updatedTime
      }
      content
      likesNum
      isLike
      repliesNum
      createdTime
      updatedTime
    }
  }
`;

export const GET_LIKED_ANSWERS = gql`
  query LikedAnswersQuery($userId: ID!) {
    answers: LikedAnswersQuery(userId: $userId) {
      list {
        _id
        user {
          id
          name
          icon
          group
        }
        question {
          _id
          title
        }
        preview
        createdTime
        updatedTime
      }
      total
    }
  }
`;