import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Router } from 'dva/router';
import React from 'react';
import { net } from 'windlike-utils';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import FrontLayout from './routes/Layout/FrontLayout';
import BackLayout from './routes/Layout/BackLayout';
import { LOGOUT_HREF } from 'Utils/constance';
import get from 'Utils/get';
import { GET_TOKEN } from 'Queries/tokens';
import { GET_CURRENT_USER } from 'Queries/users';

const createRouter = (history) => (
  <Query query={GET_CURRENT_USER}>
    {
      ({ data, loading }) => {
        const user = get(data, 'user');

        if (user || loading) {
          return (
            <LocaleProvider locale={zh_CN}>
              <Router history={history}>
                {/* 前台布局 */}
                <FrontLayout
                  user={user || {}}
                  history={history}
                  logoName="i Wanna Know" />
                {/* 后台布局 */}
                {/* <BackLayout
                  isCollapsible 
                  isCloseWhenOpenOther /> */}
              </Router>
            </LocaleProvider >

          );
        } else {
          location.href = LOGOUT_HREF;

          return '未登录';
        }
      }
    }
  </Query>
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
          ({ data, loading }) => {
            if (data && data.token) {
              localStorage.setItem('token', data.token);
              history.replace('/index/default');

              return createRouter(history);
            }

            return null;

          }
        }
      </Query>
    );
  } else {
    return createRouter(history);
  }
}

export default RouterConfig;
