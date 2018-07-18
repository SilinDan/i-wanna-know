import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import { Card, Button } from 'antd';
import { Link } from 'dva/router';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import handleError from 'Utils/errors';
import styles from './QuestionList.less';

const GET_QUESTIONS = gql`
  query QuestionsQuery($page: Int!, $perPageNum: Int) {
    questions: QuestionsQuery(page: $page, perPageNum: $perPageNum) {
      list {
        _id
        title
        time
        like
        view
        preview
        classification {
          _id
          name
        }
      }
      total
    }
  }
`;

export default class QuestionList extends Component {
  static propTypes = {

  }

  state = {
    page: 1
  }

  render() {
    const { page } = this.state;

    return (
      <Query
        variables={{ page }}
        fetchPolicy="cache-and-network"
        query={GET_QUESTIONS}>
        {
          ({ loading, data }) => {

            const { questions } = data || {};

            return (
              <Card
                extra={<Button type="primary"><Link to="/ask/default">提问</Link></Button>}
                title="热门提问"
                id="list-question"
                className={styles.list}
              >
                {
                  loading ? (new Array(3).fill(true)).map((value, index) => (
                    <QuestionCard key={index} isLoading={loading} />
                  )) : questions ? questions.list.map((question) => (
                    <QuestionCard key={question._id} item={question} />
                  )) : '这里空空的'
                }
              </Card>
            );
          }
        }
      </Query>
    );
  }
}