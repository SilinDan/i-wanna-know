import gql from 'graphql-tag';

export const GET_COURSES = gql`
    query ClassificationsQuery($majorId: String!){
        courses : ClassificationsQuery(majorId: $majorId){
            list{
                _id
                name
                questionsNum
                followedNum
                isFollowed
            }
            total
        }
    }
`;

export const GET_COURSE = gql`
    query ClassificationQuery($_id: ID!){
        course :ClassificationQuery(_id: $_id){
            _id
            name
            questionsNum
            followedNum
            isFollowed
        }
    }
`;