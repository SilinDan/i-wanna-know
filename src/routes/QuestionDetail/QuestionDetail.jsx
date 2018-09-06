/** 问题详情组件 */
import React, {Component} from 'react';
import styles from './QuestionDetail.less';
import Question from 'Components/QuestionDetail/Question';
import Answer from 'Components/QuestionDetail/Answer';
import {Radio, Card} from 'antd';

class QuestionDetail extends Component {
  state = {};

  render() {
    return (
      <div>
        <Question />
        <Card style={{marginTop: '2em'}}>
          <Radio.Group className="container">
            <Radio.Button value="large">按热度排序</Radio.Button>
            <Radio.Button value="default">按时间排序</Radio.Button>
          </Radio.Group>
        </Card>
        <Answer />
      </div>
    );
  }
}

export default QuestionDetail;
