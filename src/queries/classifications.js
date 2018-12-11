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

export const GET_FOLLOWED_COURSES = gql`
  query FollowedClassificationsQuery($userId: ID!) {
    followedCourses: FollowedClassificationsQuery(userId: $userId) {
        list {
            _id
            name
        }
        total
    }
  }
`;