/** 问题详情组件 */
import React, { Component } from 'react';
import styles from './QuestionDetail.less';
import Question from 'Components/QuestionDetail/Question';
import AnswerList from 'Components/QuestionDetail/AnswerList';
import { Query } from 'react-apollo';
import { Radio, Card } from 'antd';
import { GET_QUESTION } from 'Queries/questions';
import get from 'Utils/get';

class QuestionDetail extends Component {
  state = {};

  render() {
    const _id = get(this.props.match, 'params._id');

    return (
      <Query
        query={GET_QUESTION}
        variables={{ _id }}
      >
        {
          ({ data, loading, refetch }) => {
            const question = get(data, 'question') || {};

            return (
              <div>
                <Question question={question} refetch={refetch} />
                <Card style={{ marginTop: '2em' }}>
                  {/* <Radio.Group className="container">
                    <Radio.Button value="large">按热度排序</Radio.Button>
                    <Radio.Button value="default">按时间排序</Radio.Button>
                  </Radio.Group> */}
                  <AnswerList questionId={question._id} />
                </Card>
              </div>
            );
          }
        }
      </Query>
    );
  }
}

export default QuestionDetail;
