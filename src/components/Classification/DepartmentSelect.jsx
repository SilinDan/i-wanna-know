import React, { Component } from 'react';
import { Cascader } from 'antd';
import { Picker, List } from 'antd-mobile';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'Utils/get';

const GET_DEPARTMENTS = gql`
  query DepartmentsQuery {
      departments: DepartmentsQuery {
          list {
              name
              _id
          }
          total
      }
  }
`;

const GET_MAJORS = gql`
  query MajorsQuery($departmentId: String!) {
    majors: MajorsQuery(departmentId: $departmentId) {
        list {
            name
            _id
        }
        total
    }
  }
`;

export default class DepartmentSelect extends Component {

    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['计算机与网络安全学院', '软件工程'],
        visible: false,
        colorValue: ['#00FF00'],
        departments: []
    };

    fetchMajors = (client, selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];

        targetOption.loading = true;
        client.query({
            query: GET_MAJORS,
            variables: {
                departmentId: targetOption.value
            }
        }).then(({ data }) => {
            const majors = get(data, 'majors.list');

            console.log(targetOption);
            targetOption.loading = false;
            targetOption.children = majors.map((major) => ({
                label: major.name,
                value: major._id
            }));
        });
    }

    onChange = (v) => {
        console.log(v);
    }

    onCompleted = (data) => {
        // const departments = data.departments;
        const departments = get(data, 'departments');
        const department = get(departments, 'list.0');

        console.log(departments);

        departments.list = departments.list.map((department) => ({
            value: department._id,
            label: department.name,
            isLeaf: false
        }));

        this.setState({
            departments,
            department
        });
    }

    render() {

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

        return (
            <Query
                query={GET_DEPARTMENTS}
                onCompleted={this.onCompleted}
            >
                {
                    ({ data, loading, client }) => {
                        const list = get(data, 'departments.list') || [];
                        const options = list.map((department) => ({
                            value: department._id,
                            label: department.name,
                            isLeaf: false
                        }));

                        return (
                            <div>
                                <div className="hidden-mb" style={{ margin: '2rem' }}>
                                    <span style={{ fontSize: '0.85rem' }}>选择相关专业的课程：</span>
                                    <Cascader
                                        style={{ width: '30%' }}
                                        defaultValue={['计算机与网络安全学院', '软件工程']}
                                        options={this.state.departments}
                                        loadData={(selectedOptions) => this.fetchMajors(client, selectedOptions)}
                                        onChange={this.onChange} />

                                </div>

                                <List
                                    className="visible-block-mobile"
                                    style={{ padding: '0' }}>
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

            </Query>
        );
    }
}

