import React from 'react';
import PropTypes from 'prop-types';
import AnswerDetail from 'Components/HomePage/AnswerDetail';
import { GET_LIKED_ANSWERS } from 'Queries/answers';
import { Query } from 'react-apollo';
import get from 'Utils/get';

const propTypes = {

};

function LikedAnswersList({ userId, history }) {

  return (
    <Query
      query={GET_LIKED_ANSWERS}
      variables={{ userId }}
    >
      {
        ({ data, loading }) => {
          const answers = get(data, 'answers') || {};

          return (
            <AnswerDetail answers={answers} loading={loading} history={history} />

          );
        }
      }
    </Query>
  );
}

LikedAnswersList.propTypes = propTypes;

export default LikedAnswersList;
