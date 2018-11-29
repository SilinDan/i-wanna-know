import React, { Component } from 'react';
import { Collapse } from 'antd';
import './DescriptionCollapse.less';
import AlterInformation from 'Components/HomePage/AlterInformation';

const Panel = Collapse.Panel;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const customPanelStyle = {
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
    color: '#111',
};


export default class DescriptionCollapse extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Collapse bordered={false}>
                <Panel header={<div>查看详细资料</div>} key="1" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        );
    }
}
