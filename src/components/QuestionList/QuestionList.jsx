import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../ItemCard/ItemCard';
import { Card, Button } from 'antd';
import { Link } from 'dva/router';
import styles from './QuestionList.less';

export default class QuestionList extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Card 
      extra={<Button type="primary"><Link to="/ask/default">提问</Link></Button>}
      title="热门提问"
      id="list-question"
      className={styles.list}
      >
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
      </Card>
    );
  }
}
