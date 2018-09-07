import React, { Component } from 'react';
import styles from './Answer.less';
import { Card, Button } from 'antd';

class Answer extends Component {
  state = {};
  render() {
    return (
      <Card>
        <p>回答</p>
        <Button type="primary">回复</Button>
      </Card>
    );
  }
}

export default Answer;
