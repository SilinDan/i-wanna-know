import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import { List, Card, Button } from 'antd';
import { Link } from 'dva/router';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import handleError from 'Utils/errors';
import styles from './QuestionList.less';
import { GET_QUESTIONS } from 'Queries/questions';
import Exception from 'ant-design-pro/lib/Exception';
import get from 'Utils/get';
import InfiniteScroll from 'react-infinite-scroller';
import { throttle } from 'windlike-utils/dist/fn';

export default class QuestionList extends Component {
  static propTypes = {
    title: PropTypes.any,
    extra: PropTypes.any,
    classificationId: PropTypes.string,
    word: PropTypes.string,  // 搜索关键字
    userId: PropTypes.string,
  }

  static defaultProps = {

  }

  fetchMore = (fetchMore) => {
    const { page } = this.state;

    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }

        return {
          questions: {
            list: [...prev.questions.list, ...fetchMoreResult.questions.list],
            total: fetchMoreResult.questions.total,
            __typename: 'Questions'
          }
        };

      },
    });

    this.setState({ page: page + 1 });

  }

  state = {
    page: 1
  }

  render() {
    const { page } = this.state;
    const { userId, classificationId, extra, title, word } = this.props;

    return (
      <Query
        variables={{ userId, page: 1, classificationId, title: word }}
        fetchPolicy="cache-and-network"
        query={GET_QUESTIONS}>
        {
          ({ loading, data, fetchMore }) => {
            const questions = get(data, 'questions') || { list: [], total: 0 };
            let list = null;
            const hasMore = (!loading && page * 8 < questions.total);

            if (loading && !questions.list.length) {
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
                    <Link to={`/ask/${classificationId}`}>
                      <Button size="large" type="primary">去提问</Button>
                    </Link>
                  ) : (<div />)}
                  style={{ padding: '2rem 1rem' }}
                  desc="还没有任何问题呢" />;
              }
            }

            return (
              <InfiniteScroll
                style={{ width: '100%' }}
                initialLoad={false}
                pageStart={0}
                loadMore={() => this.fetchMore(fetchMore)}
                hasMore={hasMore}
                useWindow={true}
                loader={<p className={styles['load-text']} key={0}>Loading ...</p>}
              >
                <Card
                  extra={extra}
                  title={title}
                  id="list-question"
                  className={styles.list}
                >
                  {list}
                </Card>
                {
                  list.length ?
                    loading || page * 8 < questions.total ?
                      (<p className={styles['load-text']} key={0}>Loading ...</p>)
                      : (<p className={styles['load-text']} key={0}>没有更多啦</p>)
                    : null
                }
              </InfiniteScroll>
            );
          }
        }
      </Query>
    );
  }
}
