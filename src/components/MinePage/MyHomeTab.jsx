import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Icon, Badge } from 'antd';
import { Link } from 'dva/router';
import { LOGOUT_HREF } from 'Utils/constance';

export default class InformationCard extends Component {

    render() {
        return (
            <div>
                <List
                    style={{ marginTop: '1rem' }}
                >
                    <List.Item extra={<Badge count={25} style={{ margin: 0 }} />}>
                        <Link to="/notice/default" style={{ color: '#111' }}>
                            <Icon type="bell" theme="twoTone" style={{ margin: '0.5rem 1rem' }} />
                            消息中心
                        </Link>
                    </List.Item>
                    <List.Item extra="2个">
                        <Icon type="like" theme="twoTone" twoToneColor="#eb2f96" style={{ margin: '0.5rem 1rem' }} />
                        我赞过的
                    </List.Item>
                    <List.Item extra="0个">
                        <Icon type="star" theme="twoTone" twoToneColor="#52c41a" style={{ margin: '0.5rem 1rem' }} />
                        收藏集
                    </List.Item>

                    <List.Item>
                        <Icon type="appstore" theme="twoTone" style={{ margin: '0.5rem 1rem' }} />
                        课程管理
                    </List.Item>
                </List>
                <List style={{ marginTop: '1rem' }} >
                    <List.Item
                        onClick={() => {
                            localStorage.removeItem('token');
                            location.href = LOGOUT_HREF;
                        }}>
                        <Icon
                            type="export"
                            style={{ margin: '0.5rem 1rem', color: '#f02825' }} />
                        退出账号
                    </List.Item>
                </List>
            </div>
        );
    }
}
