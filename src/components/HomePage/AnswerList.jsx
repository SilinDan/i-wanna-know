import React, { Component } from 'react';
import AnswerDetail from 'Components/HomePage/AnswerDetail';
import { GET_USER_ANSWERS } from 'Queries/answers';
import { Query } from 'react-apollo';
import get from 'Utils/get';

export default class AnswerList extends Component {
  render() {
    const { userId } = this.props;
    const history = this.props.history;

    return (
      <Query
        skip={!userId}
        query={GET_USER_ANSWERS}
        variables={{ userId }}
      >
        {
          ({ data, loading, error }) => {
            const answers = get(data, 'answers') || {};
            const list = answers.list || [];

            return <AnswerDetail answers={answers} loading={loading} history={history} />;
          }
        }
      </Query>
    );
  }
}
