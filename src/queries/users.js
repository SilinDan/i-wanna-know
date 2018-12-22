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
      followClassificationsNum
      followQuestionsNum
      questionsNum
      likesNum
      answersNum
      informationNum
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
      followClassificationsNum
      followQuestionsNum
      questionsNum
      answersNum
      likesNum
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

export const GET_FOLLOWED_USER = gql`
  query FollowedUsersQuery($userId: ID!) {
    users: FollowedUsersQuery(userId: $userId) {
      list {
        id
        name
        icon
        isFollowed
        followsNum
        followersNum
      }
      total
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query FollowersQuery($userId: ID!) {
    users: FollowersQuery(userId: $userId) {
      list {
        id
        name
        icon
        isFollowed
        followsNum
        followersNum
      }
      total
    }
  }
`;