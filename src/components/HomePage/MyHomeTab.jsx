import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import './MyHomeTab.less';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

export default class InformationCard extends Component {

    render() {
        return (
            <div className="MyHomeTab-dd">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="动态" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab={<div>提问<span>2</span></div>} key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab={<div>回答<span>3</span></div>} key="3">Content of Tab Pane 3</TabPane>
                    <TabPane tab={<div>关注的问题</div>} key="4">Content of Tab Pane 4</TabPane>
                    <TabPane tab={<div>我的收藏</div>} key="5">Content of Tab Pane 5</TabPane>

                </Tabs>
            </div>
        );
    }
}
