import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import FollowList from './FollowList';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}
export default class NoticeTab extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={callback} s>
                <TabPane tab="我关注的人" key="1"><FollowList /></TabPane>
                <TabPane tab="关注我的人" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="我关注的课程" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        );
    }
}