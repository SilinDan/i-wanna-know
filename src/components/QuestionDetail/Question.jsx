/** 问题详情的问题组件 */
import React, { Component } from 'react';
import styles from './Question.less';
import { Icon, Button, Card } from 'antd';
import LzEditor from 'react-lz-editor';

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
        <Button type="primary" size="large" className="margin-right-md">
          回答问题
        </Button>
        <Button type="primary" size="large">
          邀请回答
        </Button>
        <div className="margin-top-lg">
          <LzEditor />
        </div>
      </Card>
    );
  }
}

export default Question;
