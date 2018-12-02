import gql from 'graphql-tag';

export const GET_DEPARTMENTS = gql`
  query DepartmentsQuery {
    departments: DepartmentsQuery {
        list {
            name
            _id
        }
        total
    }
  }
`;