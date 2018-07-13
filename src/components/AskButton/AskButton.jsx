import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './AskButton.less';

export default class AskButton extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
  }

  static defaultProps = {
    link: '/ask/default',
  }

  render() {
    const { link } = this.props;

    return (
      <Link to={link} className={`${styles['btn-ask']} visible-block-mobile`}>
        <Icon type="question" />
      </Link>
    );
  }
}
