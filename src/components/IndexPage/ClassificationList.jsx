import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import gql from 'graphql-tag';
import { withClassificationHandle } from 'Utils/HOCS';
import ClassificationCard from './ClassificationCard';
import styles from './ClassificationList.less';

const GET_CLASSIFICATIONS = gql`
  query ClassificationsQuery($page: Int!, $perPageNum: Int) {
    classifications: ClassificationsQuery(page: $page, perPageNum: $perPageNum) {
      list {
        _id
        name
        icon
      }
      total
    }
  }
`;

class ClassificationList extends PureComponent {
  static propTypes = {

  }

  render() {
    const { loading, data } = this.props;
    const classifications = data.classifications || { list: [], total: 0 };

    return (
      <Card
        title="关注的分类"
        id="list-classification"
        className={`${styles.list} visible-block-desktop`}
        loading={loading}
      >
        {
          classifications.list.map((classification) => (
            <ClassificationCard classification={classification} />
          ))
        }
      </Card>
    );
  }
}

export default withClassificationHandle(GET_CLASSIFICATIONS, ClassificationList);