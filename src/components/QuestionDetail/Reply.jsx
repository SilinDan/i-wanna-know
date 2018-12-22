import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, message } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useState } from 'react';
import { GET_REPLIES } from 'Queries/replies';
import { client } from '../../index';

const propTypes = {
  isShow: PropTypes.bool,
  answerId: PropTypes.string,
  repliedId: PropTypes.string,
  repliedUser: PropTypes.object,
};

const REPLY = gql`
  mutation Reply($answerId: ID!, $repliedId: ID, $repliedUserId: ID!, $content: String!) {
    message: reply(answerId: $answerId, repliedId: $repliedId, repliedUserId: $repliedUserId, content: $content) {
      code
      message
    }
  }
`;

function Reply({ isShow, answerId, repliedId, repliedUser = {} }) {
  const [content, setContent] = useState('');
  const reply = (replyMutation) => {
    replyMutation({
      variables: {
        answerId,
        repliedId,
        repliedUserId: repliedUser.id,
        content
      }
    }).then(({ data }) => {
      if (data.message.code === 200) {
        message.success(data.message.message);
        setContent('');
        client.query({
          query: GET_REPLIES,
          variables: { answerId }
        });
      } else {
        message.error(data.message.message);
      }
    });
  };

  return (
    <Mutation
      mutation={REPLY}
    >
      {
        (replyMutation, { loading }) => {
          return isShow ? (
            <div
              style={{ padding: '.5rem', background: '#fafbfc' }}
              className="flex-between">
              <Input
                onChange={(e) => setContent(e.target.value)}
                placeholder={`回复${repliedUser.name}`}
                className="margin-right-sm"
                value={content} />
              <Button onClick={() => reply(replyMutation)} loading={loading} type="primary">评论</Button>
            </div>

          ) : null;
        }
      }
    </Mutation>
  );
}

Reply.propTypes = propTypes;

export default Reply;
