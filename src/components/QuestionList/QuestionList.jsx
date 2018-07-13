import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../ItemCard/ItemCard';
import { Card, Button } from 'antd';
import { Link } from 'dva/router';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import handleError from 'Utils/errors';
import styles from './QuestionList.less';

const GET_QUESTIONS = gql`
  {
    questions: QuestionsQuery {
      _id
      title
      content
      preview
      classification {
        _id
        name
      }
      like
      view
    } 
  }
`;

export default class QuestionList extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Query
        fetchPolicy="cache-and-network"
        query={GET_QUESTIONS}>
        {
          ({ loading, error, data }) => {

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
                    <ItemCard key={index} isLoading={loading} />
                  )) : questions ? questions.map((question) => (
                    <ItemCard key={question._id} item={question} />
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
