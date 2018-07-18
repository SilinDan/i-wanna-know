import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './QuestionCard.less';

const { Meta } = Card;

export default class QuestionCard extends Component {
  static propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      preview: PropTypes.string,
      like: PropTypes.number,
      view: PropTypes.number,
    }),
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    item: {},
  }

  render() {
    const { item, isLoading } = this.props;

    return (
      <Card
        loading={isLoading}
        id="question-card"
        bordered={false}
        hoverable
      >
        <Link to="/question/default">
          <h3 className="title ell">{item.title}</h3>
          <content>{item.preview}</content>
        </Link>
        <div className="card-bottom">
          <Link to="/user/default" className="user">
            <Avatar className="icon-user" src="https://upload.jianshu.io/users/upload_avatars/6192738/cb13fdd2-5a22-4ba8-a44b-4a3fd05c61f9.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" />
            <span className="username">Windlike</span>
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
      </Card>
    );
  }
}
