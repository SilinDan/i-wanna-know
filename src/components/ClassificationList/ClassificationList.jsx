import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './ClassificationList.less';

export default class ClassificationList extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Card
      title="关注的分类"
      id="list-classification"
      className={`${styles.list} visible-block-desktop`}
      loading>
        
      </Card>
    );
  }
}
