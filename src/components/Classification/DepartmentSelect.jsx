import React, { Component } from 'react';
import { Cascader } from 'antd';
import { Picker, List } from 'antd-mobile';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'Utils/get';
import { client } from '../../index';
import { GET_DEPARTMENTS } from 'Queries/departments';
import { GET_MAJORS } from 'Queries/majors';


export default class DepartmentSelect extends Component {

    state = {
        departments: {
            list: [],
            total: 0
        },
        selected: [],
    };

    componentDidMount() {
        client.query({
            query: GET_DEPARTMENTS,
        }).then((res) => {
            const departments = { ...get(res.data.departments) };

            departments.list = departments.list.map((department) => ({
                value: department._id,
                label: department.name,
                key: department._id,
                isLeaf: false
            }));

            this.setState({
                departments,
            });

        });

    }

    fetchMajors = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];

        targetOption.loading = true;
        client.query({
            query: GET_MAJORS,
            variables: {
                departmentId: targetOption.value
            }
        }).then(({ data }) => {
            const majors = [...get(data, 'majors.list')];

            targetOption.loading = false;
            targetOption.children = majors.map((major) => ({
                label: major.name,
                value: major._id
            }));

            this.setState({ departments: this.state.departments });
        });
    }

    onPickerChange = (value) => {
        // 每列改变时的回调
        console.log(value);
    }

    onMajorChange = (selected) => {
        this.setState({ selected });
    }

    render() {
        const { departments } = this.state;

        const pickerData = [
            departments.list,
        ];

        return (
            <div>
                <div className="hidden-mb" style={{ margin: '2rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>请选择院系和专业：</span>
                    <Cascader
                        placeholder="请选择院系和专业"
                        value={this.state.selected}
                        style={{ width: '30%' }}
                        options={departments.list}
                        loadData={this.fetchMajors}
                        onChange={this.onMajorChange} />

                </div>

                <List
                    className="visible-block-mobile"
                    style={{ padding: '0' }}>
                    <Picker
                        cols={2}
                        data={pickerData}
                        title="选择院系和专业"
                        cascade={false}
                        extra="请选择(可选)"
                        onPickerChange={this.onPickerChange}
                        onChange={this.onPickerChange}
                    >
                        <List.Item arrow="horizontal">选择专业</List.Item>
                    </Picker>

                </List>
            </div >
        );
    }
}

