// 废弃
import React, { Component } from 'react';
import styles from './Answer.less';
import { Card, Button } from 'antd';
import Editor from 'Components/Common/Editor';

class Answer extends Component {
  state = {};
  render() {
    return (
      <Card>
        <div className="margin-top-lg">
          <Editor />
        </div>
        <Button type="primary" style={{ marginTop: '1rem' }}>提交回答</Button>
      </Card>
    );
  }
}

export default Answer;
