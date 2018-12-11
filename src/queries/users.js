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
      
    }
  }
`;
