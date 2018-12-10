import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../IndexPage/QuestionCard';
import { Card, Button, Icon } from 'antd';
import { Link } from 'dva/router';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import handleError from 'Utils/errors';
import styles from './CourseQuestionList.less';
import Follow from '../Classification/Follow';

const GET_QUESTIONS = gql`
  query QuestionsQuery($page: Int!, $perPageNum: Int) {
    questions: QuestionsQuery(page: $page, perPageNum: $perPageNum) {
      list {
        title
        content
        preview
        user {
          id
        }
        classification {
          name
        }
        like
        view
        createTime
        updateTime
      }
      total
    }
  }
`;

export default class CourseQuestionList extends Component {
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
                                extra={<div><a>热门</a><a>最新</a></div>}
                                title={<Follow />}
                                id="list-question-dd"
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
