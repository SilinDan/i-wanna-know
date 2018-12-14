import gql from 'graphql-tag';

export const GET_INFORMATION_NUM = gql`
  query InformationNumQuery {
    informationNum: InformationNumQuery {
      infoNum
      inviteNum
    }
  }
`;

export const GET_INFORMATION = gql`
  query InformationQuery($type: [String!]!, $page: Int, $perPageNum: Int) {
    information: InformationQuery(type: $type, page: $page, perPageNum: $perPageNum) {
      list {
        _id
        user {
          id
          name
          icon
        }
        time
        type

        ... on LikeInformation {
          question {
            _id
            title
          }
          answer {
            _id
          }
        }

        ...on AnswerInformation {
          question {
            _id
            title
          }
          answer {
            _id
          }
        }

        ...on ReplyInformation {
          question {
            _id
            title
          }
          answer {
            _id
          }
        }

        ...on InviteInformation {
          question {
            _id
            title
          }
        }
      }
      total
    }
  }
`;