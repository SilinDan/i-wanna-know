import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './ItemCard.less';

const { Meta } = Card;

export default class ItemCard extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Card
      id="card"
      bordered={false}
      hoverable
      >
        <Link to="/question/default" className="title ell">Flutter 布局详解</Link>
        <content>按《简书交友》的老规矩，先发一张照骗吧。 昵称：林木草 职业：大一学生，未来的教师 年龄：19 坐标：绵阳 其实很想写一篇爆文，有上千阅读量，有...</content>
        <div className="card-bottom">
          <Link to="/user/default" className="user">
            <Avatar className="icon" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <span className="username">Windlike</span>
          </Link>
          <span>
            <span className="icon pointer">
              <Icon type="heart" className="like" /> 18
            </span>
            <span className="icon">
              <Icon type="eye" /> 11
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
