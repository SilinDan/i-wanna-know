/** 回答详情组件 */
import React, { Component } from 'react';
import styles from '../QuestionDetail/QuestionDetail.less';
import Question from 'Components/QuestionDetail/Question';
import Answer from 'Components/QuestionDetail/Answer';
import { Query } from 'react-apollo';
import { Radio, Card, List } from 'antd';
import { GET_ANSWER } from 'Queries/answers';
import get from 'Utils/get';

const propTypes = {

};

function AnswerDetail(props) {
  const _id = props.match.params._id;

  return (
    <Query
      query={GET_ANSWER}
      variables={{ _id }}
    >
      {
        ({ data, loading, refetch }) => {
          const answer = get(data, 'answer') || { user: {} };

          return (
            <div>
              <Question question={answer.question} />
              <Card style={{ marginTop: '2em' }}>
                <List
                  className="answer-list"
                  itemLayout="vertical"
                  size="large"
                >
                  <Answer answer={answer} loading={loading} refetch={refetch} />
                </List>
              </Card>
            </div>
          );
        }
      }
    </Query>
  );
}

AnswerDetail.propTypes = propTypes;

export default AnswerDetail;
