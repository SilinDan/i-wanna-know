import React, {Component} from 'react';
import styles from './Answer.less';
import {Card} from 'antd';

class Answer extends Component {
  state = {};
  render() {
    return (
      <Card>
        <p>回答</p>
        <span>回复</span>
      </Card>
    );
  }
}

export default Answer;
