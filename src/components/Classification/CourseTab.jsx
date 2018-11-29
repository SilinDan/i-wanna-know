import React, { Component } from 'react';
import { Tabs, Radio } from 'antd';
import CourseTable from './CourseTable';

const TabPane = Tabs.TabPane;

export default class CourseTab extends Component {
    render() {
        return (
            <div id="CourseTab-dd">
                <Tabs
                    defaultActiveKey="1"
                >
                    <TabPane tab="计算机科学与技术" key="1">
                        <CourseTable />
                    </TabPane>
                    <TabPane tab="软件工程" key="2">Content of tab 2</TabPane>
                    <TabPane tab="网络工程" key="3">Content of tab 3</TabPane>
                    <TabPane tab="信息与计算机学" key="4">Content of tab 4</TabPane>
                    <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
                    <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
                    <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
                    <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
                    <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
                    <TabPane tab="Tab 10" key="10">Content of tab 10</TabPane>
                    <TabPane tab="Tab 11" key="11">Content of tab 11</TabPane>
                </Tabs>
            </div>
        );
    }
}

