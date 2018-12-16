import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import InviteModal from './InviteModal';
import { message } from 'antd';
import gql from 'graphql-tag';

const INVITE = gql`
  mutation invite($invitedUsers: [ID!]!, $questionId: ID!) {
    message: invite(invitedUsers: $invitedUsers, questionId: $questionId) {
      code
      message
    }
  }
`;

function InviteButton({ children, classificationId, questionId }) {
  const [isShowModal, setIsShowModal] = useState(false);

  function onOk(invite, users) {
    if (users.length) {
      invite({
        variables: {
          invitedUsers: users,
          questionId
        }
      }).then(({ data }) => {
        if (data.message.code === 200) {
          message.success(data.message.message);
          setIsShowModal(false);
        } else {
          message.error(data.message.message);
        }
      });
    } else {
      setIsShowModal(false);
    }
  }

  return (
    <Mutation
      mutation={INVITE}
    >
      {
        (invite, { data, loading }) => {
          return (
            <React.Fragment>
              <span onClick={() => setIsShowModal(true)}>
                {children}
              </span>
              <InviteModal
                questionId={questionId}
                classificationId={classificationId}
                onOk={(users) => onOk(invite, users)}
                onCancel={() => setIsShowModal(false)}
                visible={isShowModal} />
            </React.Fragment>
          );
        }
      }
    </Mutation>
  );
}

export default InviteButton;
