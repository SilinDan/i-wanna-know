import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from 'antd';
import { Link } from 'dva/router';
import styles from './MobileMenuItem.less';

export default class MobileMenuItem extends Component {
  static propTypes = {
    menu: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
    isActive: PropTypes.bool,
    dot: PropTypes.bool,
  }

  static defaultProps = {
    menu: {
      name: '首页',
      icon: 'home',
      link: '',
    }
  }

  render() {
    const { menu, isActive, dot } = this.props;

    return (
      <Badge dot={Boolean(dot)} className={styles['dot']}>
        <Link to={menu.link} className={styles['menu-item']}>
          <Icon
            type={menu.icon}
            className={isActive ? `${styles['menu-icon']} ${styles['menu-active']}` : styles['menu-icon']} />
          <h2
            className={isActive ? `${styles['menu-name']} ${styles['menu-active']}` : styles['menu-name']}>{menu.name}</h2>
        </Link>

      </Badge>
    );
  }
}
