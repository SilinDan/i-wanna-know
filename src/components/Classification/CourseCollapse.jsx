import React, { Component } from 'react';
import { Collapse } from 'antd';

import './CourseCollapse.less';
import CourseTab from './CourseTab';

const Panel = Collapse.Panel;

const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
  </p>
);


export default class FollowAll extends Component {
    render() {
        return (
            <div id="CourseCollapse-dd">
                <Collapse bordered={false}>
                    <Panel header="公共课" key="1" />
                    <Panel header="计算机与网络安全学院" key="2">
                        <CourseTab />
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 4" key="4">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="5">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 6" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 7" key="7">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 8" key="8">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 9" key="9">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>
                    <Panel header="This is panel header 5" key="6">
                        {text}
                    </Panel>

                </Collapse>
            </div>
        );
    }
}

