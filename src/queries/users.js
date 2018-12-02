import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query CurrentUserQuery {
    user: CurrentUserQuery {
      id
      name
      departmentId
      majorId
    }
  }
`;
