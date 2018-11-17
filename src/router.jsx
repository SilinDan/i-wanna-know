import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Router } from 'dva/router';
import React from 'react';
import { net } from 'windlike-utils';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import FrontLayout from './routes/Layout/FrontLayout';
import BackLayout from './routes/Layout/BackLayout';

const GET_TOKEN = gql`
query TokenQuery($token: String!) {
  token: TokenQuery(token: $token)
}
`;

const createRouter = (history) => (
  <LocaleProvider locale={zh_CN}>
    <Router history={history}>
      {/* 前台布局 */}
      <FrontLayout
        history={history}
        logoName="i Wanna Know" />
      {/* 后台布局 */}
      {/* <BackLayout
      isCollapsible 
      isCloseWhenOpenOther /> */}
    </Router>
  </LocaleProvider >
);

function RouterConfig({ history }) {
  // 从地址获取token
  const token = net.parseParams(location.search).token;

  if (token) {
    return (
      <Query
        variables={{ token }}
        fetchPolicy="cache-and-network"
        query={GET_TOKEN}
      >
        {
          ({data}) => {
            if (data && data.token) {
              console.log(data);
              localStorage.setItem('token', data.token);
              history.replace('/index/default');
            }

            return createRouter(history);
          }
        }
      </Query>
    );
  } else {
    return createRouter(history);
  }
}

export default RouterConfig;
