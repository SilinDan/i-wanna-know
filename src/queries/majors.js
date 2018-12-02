import gql from 'graphql-tag';

export const GET_MAJORS = gql`
  query MajorsQuery($departmentId: String!) {
    majors: MajorsQuery(departmentId: $departmentId) {
        list {
            name
            _id
        }
        total
    }
  }
`;