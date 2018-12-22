import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import gql from 'graphql-tag';

const FOLLOW_QUESTION = gql`
  mutation followQuestion($questionId: ID!) {
    message: followQuestion(questionId: $questionId) {
      code
      message
    }
  }
`;

const CANCEL_FOLLOW_QUESTION = gql`
  mutation cancelFollowQuestion($questionId: ID!) {
    message: cancelFollowQuestion(questionId: $questionId) {
      code
      message
    }
  }
`;

const propTypes = {
  questionId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  isFollowed: PropTypes.bool.isRequired
};

function FollowQuestionButton({ questionId, children, isFollowed, refetch }) {
  const follow = (followMutation, loading) => {
    if (!loading) {
      followMutation({
        variables: {
          questionId
        }
      }).then(({ data }) => {
        if (data.message.code === 200) {
          refetch();
        } else {
          message.error(data.message.message);
        }
      });
    }
  };

  return (
    <Mutation
      mutation={isFollowed ? CANCEL_FOLLOW_QUESTION : FOLLOW_QUESTION}
    >
      {
        (followMutation, { data, loading }) => {
          return (
            <span onClick={() => follow(followMutation, loading)}>
              {children}
            </span>
          );
        }
      }
    </Mutation>
  );
}

FollowQuestionButton.propTypes = propTypes;

export default FollowQuestionButton;
