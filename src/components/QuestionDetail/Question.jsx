/** 问题详情的问题组件 */
import React, { Component } from 'react';
import styles from './Question.less';
import { Icon, Button, Card } from 'antd';

class Question extends Component {
  state = {};
  render() {
    return (
      <Card>
        <h2 className={styles.title}>Title</h2>
        <p className={styles.time}>
          <Icon type="clock-circle" />
          2018.09.14 09:00
        </p>
        <p>正文</p>
        <Button className="margin-right-md" type="primary">
          <Icon type="highlight" />写回答
        </Button>
        <Button style={{ color: '#40a9ff', 'borderColor': '#40a9ff' }}>
          <Icon type="user-add" />邀请回答
        </Button>

      </Card>
    );
  }
}

export default Question;
