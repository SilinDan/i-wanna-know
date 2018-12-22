import React from 'react';
import PropTypes from 'prop-types';
import styles from './AnswerList.less';
import { Query } from 'react-apollo';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import { Avatar, List, Icon } from 'antd';
import { GET_REPLIES } from 'Queries/replies';
import get from 'Utils/get';
import { formatDate } from 'Utils/utils';

const propTypes = {
  answerId: PropTypes.string,
  isShow: PropTypes.bool,
  setRepliedId: PropTypes.func,
  setRepliedUser: PropTypes.func,
};

function ReplyList({ answerId = '', isShow, setRepliedId, setRepliedUser }) {

  const handleClickReply = (_id, user) => {
    setRepliedId(_id);
    setRepliedUser(user);
  };

  return (
    <Query
      skip={!isShow}
      variables={{ answerId }}
      query={GET_REPLIES}
    >
      {
        ({ data, loading }) => {
          const replies = get(data, 'replies') || {};
          const list = replies.list || [];
          const total = replies.total || 0;

          return (
            <List loading={loading}>
              {
                list.map((reply) => (
                  <div key={reply._id} className={styles.reply}>
                    <Avatar size={40} src={reply.user.icon ? `${SERVER_ADDRESS}/uploads/icons/${reply.user.icon}` : DEFAULT_ICON} />
                    <span className="margin-left-sm">
                      <h3>{reply.user.name}</h3>
                      <p>{formatDate(reply.createdTime)}</p>
                      <p className="margin-top-sm">
                        回复 {reply.repliedUser ? reply.repliedUser.name : ''}: {reply.content}
                      </p>
                      <p className="margin-top-sm" onClick={() => handleClickReply(reply._id, reply.user)}>
                        <Icon type="message" className="margin-right-sm" />回复
                      </p>
                    </span>
                  </div>
                ))
              }
            </List>
          );
        }
      }
    </Query>
  );
}

ReplyList.propTypes = propTypes;

export default ReplyList;
