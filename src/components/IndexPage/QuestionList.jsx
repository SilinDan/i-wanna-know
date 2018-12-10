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
import { throttle } from 'windlike-utils/dist/fn';

export default class QuestionList extends Component {
  static propTypes = {
    title: PropTypes.any,
    extra: PropTypes.any,
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

  loadMore = () => {

  }

  componentDidMount() {
    const executor = throttle(this.loadMore, 200);

    document.addEventListener('scroll', function () {
      executor.execute();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMore);
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
            let list = null;

            if (loading) {
              list = (new Array(3).fill(true)).map((value, index) => (
                <QuestionCard key={index} isLoading={loading} />
              ));
            } else {
              if (questions && questions.list.length) {
                list = questions.list.map((question) => (
                  <QuestionCard key={question._id} item={question} />
                ));
              } else {
                list = <Exception
                  actions={classificationId ? (
                    <Link to="/ask/default">
                      <Button size="large" type="primary">去提问</Button>
                    </Link>
                  ) : (<div />)}
                  style={{ padding: '2rem 1rem' }}
                  desc="还没有任何问题呢" />;
              }
            }

            return (
              <Card
                extra={extra}
                title={title}
                id="list-question"
                className={styles.list}
              >
                {/* TODO:当没数据的时候显示图片 */}
                {list}
              </Card>
            );
          }
        }
      </Query>
    );
  }
}
