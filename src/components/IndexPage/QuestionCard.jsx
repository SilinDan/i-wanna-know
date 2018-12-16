import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './QuestionCard.less';
import get from 'Utils/get';
import { Button } from 'antd-mobile';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';

const { Meta } = Card;

export default class QuestionCard extends Component {
  static propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      preview: PropTypes.string,
      like: PropTypes.number,
      view: PropTypes.number,
      user: PropTypes.object,
      classification: PropTypes.object,
    }),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    item: {},
  };

  render() {
    const { item, isLoading } = this.props;
    const user = get(item, 'user') || {};
    const classification = item.classification || {};

    return (
      <Card loading={isLoading} id="question-card" bordered={false} hoverable>
        <div className="flex-between">
          <Link
            to={`/question/${item._id}`}
          >
            <h3 className="title ell">{item.title}</h3>
          </Link>
          <Link to={`/course/${classification._id}`} className="classification">{classification.name}</Link>
        </div>
        <Link
          to={`/question/${item._id}`}
        >
          <content>{item.preview}</content>
        </Link>
        <div className="card-bottom">
          <Link to={{
            pathname: `/home/${user.id}`,

          }}
            className="user"
          >
            <Avatar
              className="icon-user"
              src={user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON}
            />
            <span className="username">{get(item, 'user.name')}</span>
          </Link>
          <span>
            <span className="icon pointer">
              <Icon type="heart" className="like" /> {item.like}
            </span>
            <span className="icon">
              <Icon type="eye" /> {item.view}
            </span>
            <span className="icon pointer">
              <Icon type="star" className="star" />
            </span>
          </span>
        </div>
      </Card >
    );
  }
}
