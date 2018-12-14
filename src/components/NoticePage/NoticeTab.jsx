import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import NoticeList from './NoticeList';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}
export default class NoticeTab extends Component {

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="消息" key="1"><NoticeList /></TabPane>
                <TabPane tab="邀请" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        );
    }
}