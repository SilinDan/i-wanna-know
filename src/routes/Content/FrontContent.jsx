import { Breadcrumb, Layout } from 'antd';
import { Switch } from 'dva/router';
import React, { Component } from 'react';
import routes from '../../routes';
import styles from './FrontContent.less';

const { Content } = Layout;
const routeComponents = routes.map(({name, Component}) => Component());

export default class FrontContent extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Content className={styles['content-front']}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Switch location={location}>
          {routeComponents}
        </Switch>
      </Content>
    );
  }
}
