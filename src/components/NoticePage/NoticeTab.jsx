import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import NoticeList from './NoticeList';

const TabPane = Tabs.TabPane;

export default class NoticeTab extends Component {

    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="消息" key="1">
                    <NoticeList type={['Answer', 'Reply', 'Follow', 'Like']} />
                </TabPane>
                <TabPane tab="邀请" key="2">
                    <NoticeList type={['Invite']} />
                </TabPane>
            </Tabs>
        );
    }
}