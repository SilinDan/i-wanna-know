import React, { Component } from 'react';
import styles from './Answer.less';
import { Card, Button } from 'antd';
import LzEditor from 'react-lz-editor';

class Answer extends Component {
  state = {};
  render() {
    return (
      <Card>
        <div className="margin-top-lg">
          <LzEditor />
        </div>
        <Button type="primary" style={{ marginTop: '1rem' }}>提交回答</Button>

      </Card>
    );
  }
}

export default Answer;
