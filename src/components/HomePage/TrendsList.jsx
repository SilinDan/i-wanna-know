import React from 'react';
import PropTypes from 'prop-types';
import TrendsCard from 'Components/HomePage/TrendsCard';
import { Query } from 'react-apollo';
import get from 'Utils/get';
import { GET_NEWS } from 'Queries/news';

const propTypes = {
  userId: PropTypes.string,
};

function TrendsList({ userId }) {
  return (
    <Query
      skip={!userId}
      query={GET_NEWS}
      variables={{ userId }}
    >
      {
        ({ data, loading }) => {
          const news = get(data, 'news') || {};

          return (
            <div >
              <TrendsCard news={news} />
            </div>
          );
        }
      }
    </Query>
  );
}

TrendsList.propTypes = propTypes;

export default TrendsList;
