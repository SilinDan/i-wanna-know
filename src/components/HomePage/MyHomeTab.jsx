import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Tabs } from 'antd';
import './MyHomeTab.less';
import TrendsCard from './TrendsCard';
import CourseFollowed from './CourseFollowed';
import { Link } from 'dva/router';


const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

export default class InformationCard extends Component {

    render() {
        return (
            <div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    className="MyHomeTab-dd hidden-mb"
                >
                    <TabPane tab="动态" key="1"><TrendsCard /></TabPane>
                    <TabPane tab={<div>提问<span>2</span></div>} key="2">dd</TabPane>
                    <TabPane tab={<div>回答<span>3</span></div>} key="3">Content of Tab Pane 3</TabPane>
                    <TabPane tab={<div>关注的问题</div>} key="4">Content of Tab Pane 4</TabPane>
                    <TabPane tab={<div>关注的课程</div>} key="5">
                        <CourseFollowed />
                    </TabPane>
                </Tabs>


                {/* 下面为手机端 */}
                <div className="hidden-desktop hidden-tablet">
                    <List

                        style={{ marginTop: '1rem' }}
                    >
                        <Link to="/homeTrends/default">
                            <List.Item arrow="horizontal" onClick={() => { }}>
                                动态
                        </List.Item>
                        </Link>

                    </List>
                    <List style={{ marginTop: '1rem' }}>
                        <List.Item
                            arrow="horizontal"
                            onClick={() => { }}
                            extra="0"
                        >
                            提问
                    </List.Item>
                        <List.Item
                            arrow="horizontal"
                            onClick={() => { }}
                            extra="0"
                        >
                            回答
                    </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra="0"
                        >
                            关注的问题
                    </List.Item>

                        <Link to="/homeCourse/default">
                            <List.Item
                                arrow="horizontal"
                                onClick={() => { }}
                                extra="0"
                            >

                                关注的课程
                            </List.Item>
                        </Link>

                    </List>

                    <List style={{ marginTop: '1rem' }}>
                        <List.Item
                            arrow="horizontal"
                            onClick={() => { }}
                            extra="0"
                        >
                            赞过的回答

                    </List.Item>
                        <List.Item
                            arrow="horizontal"
                            onClick={() => { }}
                            extra="0"
                        >
                            收藏集

                    </List.Item>
                    </List>
                </div>
            </div>
        );
    }
}
