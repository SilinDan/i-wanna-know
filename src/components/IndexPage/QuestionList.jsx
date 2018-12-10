import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import { Card, Button } from 'antd';
import { Link } from 'dva/router';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import handleError from 'Utils/errors';
import styles from './QuestionList.less';
import { GET_QUESTIONS } from 'Queries/questions';
import Exception from 'ant-design-pro/lib/Exception';
import get from 'Utils/get';

export default class QuestionList extends Component {
  static propTypes = {
    title: PropTypes,
    extra: PropTypes,
    classificationId: PropTypes.string,
    word: PropTypes.string,  // 搜索关键字
  }

  static defaultProps = {
    title: '问题',
    extra: (
      <Button type="primary">
        <Link to="/ask/default">提问</Link>
      </Button>
    )
  }

  state = {
    page: 1
  }

  render() {
    const { page } = this.state;
    const { classificationId, extra, title, word } = this.props;

    return (
      <Query
        variables={{ page, classificationId, title: word }}
        fetchPolicy="cache-and-network"
        query={GET_QUESTIONS}>
        {
          ({ loading, data }) => {
            const questions = get(data, 'questions');

            return (
              <Card
                extra={extra}
                title={title}
                id="list-question"
                className={styles.list}
              >
                {/* TODO:当没数据的时候显示图片 */}
                {
                  loading ? (new Array(3).fill(true)).map((value, index) => (
                    <QuestionCard key={index} isLoading={loading} />
                  )) : questions ? questions.list.map((question) => (
                    <QuestionCard key={question._id} item={question} />
                  )) : <Exception
                        actions={(
                          <Link to="/classification/default">
                            <Button size="large" type="primary">去关注</Button>
                          </Link>
                        )}
                        style={{ padding: '2rem 1rem' }}
                        desc="你还没有关注任何课程呢" />
                }
              </Card>
            );
          }
        }
      </Query>
    );
  }
}
