import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import NoticeList from './NoticeList';

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
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="赞" key="1"><NoticeList /></TabPane>
                <TabPane tab="邀请" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="回复" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        );
    }
}