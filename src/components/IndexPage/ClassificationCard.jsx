import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { CLASSIFICATION_ICON_PATH } from 'Utils/constance';
import styles from './ClassificationCard.less';

export default class ClassificationCard extends PureComponent {
  static propTypes = {
    classification: PropTypes.object.isRequired,
  }

  static defaultProps = {
    classification: {}
  }

  render() {
    const { classification } = this.props;

    return (
      <Card
        id="classification-card"
        bordered={false}
      >
        <img src={`${CLASSIFICATION_ICON_PATH}/${classification.icon}`} alt={classification.name} />
        <span className="name">{classification.name}</span>
      </Card>
    );
  }
}
