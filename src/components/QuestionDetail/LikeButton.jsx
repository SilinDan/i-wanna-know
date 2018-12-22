import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { message } from 'antd';

const LIKE = gql`
  mutation like($answerId: ID!) {
    message: like(answerId: $answerId) {
      code
      message
    }
  }
`;
const CANCEL_LIKE = gql`
  mutation cancelLike($answerId: ID!) {
    message: cancelLike(answerId: $answerId) {
      code
      message
    }
  }
`;

const propTypes = {
  refetch: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
};

function LikeButton({ children, answer = {}, refetch }) {
  const like = (mutation, loading) => {
    if (!loading) {
      mutation({
        variables: {
          answerId: answer._id
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
      mutation={answer.isLike ? CANCEL_LIKE : LIKE}
    >
      {
        (mutation, { loading }) => {
          return (
            <div onClick={() => like(mutation, loading)}>
              {children}
            </div>
          );

        }
      }
    </Mutation>
  );
}

LikeButton.propTypes = propTypes;

export default LikeButton;
