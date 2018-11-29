import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';

const data = [
    {
        title: '2018年11月22日16:55',
    },
    {
        title: '2018年11月22日16:55',
    },
    {
        title: '2018年11月22日16:55',
    },
    {
        title: '2018年11月22日16:55',
    },
];

export default class NoticeTab extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <List style={{ 'padding-left': '2rem' }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={<div><b>沈丹</b>赞了你的回答<a>华晨宇为什么那么迷人</a></div>}
                        />
                    </List.Item>
                )}
            />
        );
    }
}