import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Icon, Badge } from 'antd';
import { Link } from 'dva/router';
import { LOGOUT_HREF } from 'Utils/constance';
import { client } from '../../index';
import { GET_INFORMATION_NUM } from 'Queries/information';

export default class InformationCard extends Component {

    state = {
        informationNum: {
            infoNum: 0,
            inviteNum: 0
        }
    }

    componentDidMount() {
        client.query({
            query: GET_INFORMATION_NUM
        }).then(({ data }) => {
            if (data.informationNum) {
                this.setState({ informationNum: data.informationNum });
            }
        });
    }

    render() {
        const { informationNum } = this.state;
        const { infoNum, inviteNum } = informationNum;

        return (
            <div>
                <List
                    style={{ marginTop: '1rem' }}
                >
                    <Link to="/notice/default" style={{ color: '#111' }}>
                        <List.Item extra={<Badge count={infoNum + inviteNum} style={{ margin: 0 }} />}>
                            <Icon type="bell" theme="twoTone" style={{ margin: '0.5rem 1rem' }} />
                            消息中心
                        </List.Item>
                    </Link>
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
