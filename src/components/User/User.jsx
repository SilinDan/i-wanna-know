/** 前台头部用户头像组件 */
import { Avatar, Dropdown } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './User.less';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import { GET_CURRENT_USER } from 'Queries/users';
import { Query } from 'react-apollo';

export default class User extends Component {
  static propTypes = {
    menu: PropTypes.element.isRequired,
  }

  render() {
    const { menu } = this.props;

    return (
      <Query query={GET_CURRENT_USER}>
        {
          ({ data }) => {
            const user = data.user || {};

            return (
              <Dropdown
                overlay={menu}
              >
                <Link
                  to="/home/default"
                  className="flex-center hidden-mb"
                  style={{ minHeight: '100%' }}>
                  <Avatar
                    style={{ marginRight: user.name ? '8px' : '0' }}
                    src={user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON}
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{user.name}</span>
                </Link>
              </Dropdown>
            );
          }
        }
      </Query>
    );
  }
}
