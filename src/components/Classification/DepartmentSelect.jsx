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
        colNum: 1,  // 手机端选择器列数
        pickerValue: [],  // 手机端选择器值[学院, 专业]
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
                isLeaf: false,
            }));

            this.setState({
                departments,
            });

        });
    }

    fetchMajors = (departmentId, callback) => {
        // 获取专业
        return client.query({
            query: GET_MAJORS,
            variables: {
                departmentId: departmentId
            }
        }).then(({ data }) => {
            if (typeof callback === 'function') {
                callback(data);
            }

            return data;
        });
    }

    handleSelectDepartment = (selectedOptions) => {
        // 电脑端选择学院后加载数据回调函数
        const targetOption = selectedOptions[selectedOptions.length - 1];

        targetOption.loading = true;
        this.fetchMajors(
            targetOption.value,
            (data) => {
                const majors = [...get(data, 'majors.list')];

                targetOption.loading = false;
                targetOption.children = majors.map((major) => ({
                    label: major.name,
                    value: major._id
                }));

                this.setState({ departments: this.state.departments });
            }
        );
    }

    handleClickPicker = () => {
        // 手机端点击Picker
        const pickerValue = [];

        pickerValue.push(this.state.departments.list[0]._id);

        this.fetchMajors(
            this.state.departments.list[0].value,
            (data) => {
                const majors = [...get(data, 'majors.list')];
                const departments = { ...this.state.departments };

                departments.list[0].children = majors.map((major) => ({
                    value: major._id,
                    label: major.name
                }));

                pickerValue.push(majors[0]._id);

                this.setState({
                    pickerValue,
                    departments,
                    colNum: 2
                });
            }
        );

    }

    onPickerChange = (value) => {
        // 每列改变时的回调
        // FIXME: 每列改变后会改变选中的值
        const pickerValue = [...value];

        if (value.length == 1) {
            this.fetchMajors(value[0]).then((data) => {
                const majors = [...get(data, 'majors.list')];
                const departments = { ...this.state.departments };

                for (let i = 0; i < departments.list.length; i++) {
                    if (departments.list[i].value == value[0]) {
                        departments.list[i].children = majors.map((major) => ({
                            value: major._id,
                            label: major.name
                        }));
                        break;
                    }
                }

                pickerValue.push(majors[0]._id);

                this.setState({
                    departments,
                    pickerValue
                });
            });
        } else {
            this.setState({
                pickerValue
            });
        }
    }

    onMajorChange = (selected) => {
        this.setState({ selected: selected });
        this.props.selectMajor(selected[1]);
    }

    onOK = () => {
        this.props.selectMajor(this.state.pickerValue[1]);
    }

    render() {
        const { departments, colNum, pickerValue } = this.state;

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
                        loadData={this.handleSelectDepartment}
                        onChange={this.onMajorChange} />

                </div>

                <List
                    className="visible-block-mobile"
                    style={{ padding: '0' }}>
                    <Picker
                        cols={colNum}
                        data={departments.list}
                        value={pickerValue}
                        title="选择院系和专业"
                        extra="请选择(可选)"
                        onPickerChange={this.onPickerChange}
                        onChange={this.onPickerChange}
                        onOk={this.onOK}
                    >
                        <List.Item arrow="horizontal" onClick={this.handleClickPicker}>选择专业</List.Item>
                    </Picker>

                </List>
            </div >
        );
    }
}

