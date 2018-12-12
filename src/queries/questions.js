import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query QuestionsQuery($title: String, $userId: String, $classificationId: String $page: Int, $perPageNum: Int) {
    questions: QuestionsQuery(title: $title, userId: $userId, classificationId: $classificationId, page: $page, perPageNum: $perPageNum) {
      list {
        _id
        title
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
        like
        view
        createdTime
        updatedTime
      }
      total
    }
  }
`;

export const GET_QUESTION = gql`
  query QuestionQuery($_id: ID!) {
    question: QuestionQuery(_id: $_id) {
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
      like
      view
      createdTime
      updatedTime
    }
  }
`;