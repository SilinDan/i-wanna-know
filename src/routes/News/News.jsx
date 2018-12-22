import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Query } from 'react-apollo';
import TrendsCard from 'Components/HomePage/TrendsCard';
import get from 'Utils/get';
import { GET_FOLLOWED_NEWS, GET_FOLLOWED_QUESTION_NEWS } from 'Queries/news';

const TabPane = Tabs.TabPane;
const propTypes = {

};

function News(props) {
  return (
    <div style={{ background: '#fff' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="关注的人" key="1">
          <Query
            query={GET_FOLLOWED_NEWS}
          >
            {
              ({ data, loading }) => {
                const news = get(data, 'news') || {};

                return (
                  <TrendsCard news={news} loading={loading} />

                );
              }
            }
          </Query>
        </TabPane>
        <TabPane tab="关注的问题" key="2" >
          <Query
            query={GET_FOLLOWED_QUESTION_NEWS}
          >
            {
              ({ data, loading }) => {
                const news = get(data, 'news') || {};

                return (
                  <TrendsCard news={news} loading={loading} />

                );
              }
            }
          </Query>

        </TabPane>
      </Tabs>
    </div>
  );
}

News.propTypes = propTypes;

export default News;
