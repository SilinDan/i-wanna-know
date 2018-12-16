import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query CurrentUserQuery {
    user: CurrentUserQuery {
      id
      name
      departmentId
      department
      majorId
      class
      major
      group
      followsNum
      followersNum
      icon
      text
    }
  }
`;

export const GET_USER = gql`
  query UserQuery($id: ID!) {
    user: UserQuery(id: $id) {
      id
      name
      departmentId
      department
      majorId
      class
      major
      group
      followsNum
      followersNum
      icon
      text
    }
  }
`;

export const GET_RECOMMEND_USERS = gql`
  query RecommendUsersQuery($classificationId: ID!, $questionId: ID!) {
    recommendUsers: RecommendUsersQuery(classificationId: $classificationId, questionId: $questionId) {
      teachers {
        id
        name
        department
        isInvited
      }
      students {
        id
        name
        isInvited
      }
    }
  }
`;
