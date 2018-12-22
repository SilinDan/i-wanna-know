import React, { useState } from 'react';
import UserTag from 'Components/Common/UserTag';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import ReplyList from './ReplyList';
import Reply from './Reply';
import LikeButton from './LikeButton';
import { formatDate, createMarkup } from 'Utils/utils';
import styles from './AnswerList.less';
import { Link } from 'dva/router';
import Prism from 'prismjs';
import { List, Avatar, Icon, Input, Button } from 'antd';

const IconText = ({ type, text, onClick, theme }) => (
  <span onClick={onClick}>
    <Icon type={type} style={{ marginRight: 8 }} theme={theme} />
    {text}
  </span>
);

function Answer({ answer = {}, loading, refetch }) {
  const highlight = (container) => {
    if (container) {
      Prism.highlightAllUnder(container);
    }
  };

  const [isShowReply, setIsShowReply] = useState(false);
  const [repliedId, setRepliedId] = useState(answer._id);
  const [repliedUser, setRepliedUser] = useState(answer.user);

  const onClickReply = () => {
    setIsShowReply(!isShowReply);
    setRepliedId(answer._id);
    setRepliedUser(answer.user);
  };

  return (
    <React.Fragment>
      <List.Item
        key={answer.title}
        actions={loading ? [] : [
          (
            <LikeButton answer={answer} key="1" refetch={refetch}>
              <IconText type="like" text={answer.likesNum} theme={answer.isLike ? 'filled' : ''} />
            </LikeButton>
          ),
          < IconText
            type="message"
            text={answer.repliesNum}
            key="2"
            onClick={onClickReply} />,
        ]}

      >
        <List.Item.Meta
          title={
            <React.Fragment>
              <div>
                <Link className={styles.name} to={`/home/${answer.user.id}`}>{answer.user.name}</Link>
                <UserTag group={answer.user.group} />
              </div>
              <p className={styles.time}>
                {formatDate(answer.createdTime)}
              </p>
            </React.Fragment>
          }
          avatar={
            <Link to={`/home/${answer.user.id}`}>
              <Avatar
                size="large"
                src={answer.user.icon ?
                  `${SERVER_ADDRESS}/uploads/icons/${answer.user.icon}` :
                  DEFAULT_ICON}
              />
            </Link>
          }
        />
        <p ref={highlight} dangerouslySetInnerHTML={createMarkup(answer.content)} />
      </List.Item>
      <Reply isShow={isShowReply} repliedId={repliedId} repliedUser={repliedUser} answerId={answer._id} />
      <ReplyList
        isShow={isShowReply}
        answerId={answer._id}
        setRepliedId={setRepliedId}
        setRepliedUser={setRepliedUser} />
    </React.Fragment >
  );
}

export default Answer;
