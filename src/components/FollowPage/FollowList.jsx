import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Button } from 'antd';

import './FollowList.less';

const data = [
    {
        title: '沈丹',
    },
    {
        title: 'TONY',
    },
    {
        title: '刘杨锋',
    },
    {
        title: '华晨宇',
    },
];

export default class NoticeTab extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <List id="FollowList-dd"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<div className="flexfollow-dd">
                                <div><a href="">{item.title}</a> </div>
                                <div className="follow-button"><Button type="primary">+关注</Button></div>
                            </div>}
                            description={<div className="description-dd">
                                <b>2000</b>个回答
                                <span>
                                    <b>2000</b>
                                    个关注者
                                </span>
                            </div>}
                        />
                    </List.Item>
                )}
            />
        );
    }
}