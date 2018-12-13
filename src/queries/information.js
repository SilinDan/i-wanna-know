import gql from 'graphql-tag';

export const GET_INFORMATION_NUM = gql`
  query InformationNumQuery {
    informationNum: InformationNumQuery {
      infoNum
      inviteNum
    }
  }
`;