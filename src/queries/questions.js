import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query QuestionsQuery($title: String, $page: Int, $perPageNum: Int) {
    questions: QuestionsQuery(title: $title, page: $page, perPageNum: $perPageNum) {
      list {
        _id
        title
        preview
        user {
          id
          name
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