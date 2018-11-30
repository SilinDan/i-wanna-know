import React, { Component } from 'react';
import { Cascader } from 'antd';
import { Picker, List } from 'antd-mobile';


export default class DepartmentSelect extends Component {

    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['计算机与网络安全学院', '软件工程'],
        visible: false,
        colorValue: ['#00FF00'],
    };

    render() {


        const options = [{
            value: '计算机与网络安全学院',
            label: '计算机与网络安全学院',
            children: [{
                value: '软件工程',
                label: '软件工程',
            }, {
                value: '计算机科学与技术',
                label: '计算机科学与技术',
            }

            ],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
            }],
        }];

        const seasons = [
            [
                {
                    label: '计算机与网络安全学院',
                    value: '计算机与网络安全学院',
                },
                {
                    label: '2014',
                    value: '2014',
                },
            ],
            [
                {
                    label: '软件工程',
                    value: '软件工程',
                },
                {
                    label: '夏',
                    value: '夏',
                },
            ],
        ];

        function onChange(value) {
            console.log(value);
        }

        return (
            <div>
                <div className="hidden-mb" style={{ margin: '2rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>选择相关专业的课程：</span>
                    <Cascader
                        style={{ width: '30%' }}
                        defaultValue={['计算机与网络安全学院', '软件工程']}
                        options={options}
                        onChange={onChange} />

                </div>

                <List className="visible-block-mobile" style={{ padding: '0' }}>
                    <Picker
                        data={seasons}
                        title="选择专业"
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                        onOk={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal">选择专业</List.Item>
                    </Picker>

                </List>
            </div >

        );
    }
}

