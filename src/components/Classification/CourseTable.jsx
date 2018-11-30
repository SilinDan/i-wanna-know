import React, { Component } from 'react';
import { Table, Button, Icon, List } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'Utils/get';

const GET_COURSES = gql`
    query ClassificationsQuery($majorId:  String!){
        courses : ClassificationsQuery(majorId: $majorId){
            list{
                _id
                name
                followedNum
                isFollowed
            }
            total
        }
    }
`;

const data = [{
    key: '1',
    courseName: '算法与数据结构',
    classification: '必修',
    follow: 200,
}, {
    key: '2',
    courseName: 'Java EE编程技术（2）',
    classification: '限选',
    follow: 1000,
}];

const course = [
    {
        title: '算法与数据结构',
    },
    {
        title: 'Java EE编程技术（2）',
    },
    {
        title: 'Java EE编程技术（2）',
    },
    {
        title: 'Java EE编程技术（2）',
    },
];

export default class CourseTable extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    }

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    }


    render() {


        let { sortedInfo, filteredInfo } = this.state;

        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: '课程名',
                dataIndex: 'name',
                key: 'name',
                filters: [
                    { text: 'Joe', value: 'Joe' },
                    { text: 'Jim', value: 'Jim' },
                ],
                filteredValue: filteredInfo.courseName || null,
                onFilter: (value, record) => record.courseName.includes(value),
                sortOrder: sortedInfo.columnKey === 'courseName' && sortedInfo.order,
            },
            // {
            //     title: '类别',
            //     dataIndex: 'classification',
            //     key: 'classification',
            //     filters: [
            //         { text: '任选', value: '任选' },
            //         { text: '限选', value: '限选' },
            //     ],
            //     filteredValue: filteredInfo.classification || null,
            //     onFilter: (value, record) => record.classification.includes(value),
            //     sortOrder: sortedInfo.columnKey === 'classification' && sortedInfo.order,
            // },
            {
                title: '关注数',
                dataIndex: 'followedNum',
                key: 'followedNum',
                sorter: (a, b) => a.follow - b.follow,
                sortOrder: sortedInfo.columnKey === 'follow' && sortedInfo.order,
            },
            {

            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary"><Icon type="plus" />关注</Button>
                    </span>
                ),
            }
        ];

        return (
            <Query
                variables={{ majorId: this.props.majorId }}
                query={GET_COURSES}
            >
                {
                    ({ data, loading }) => {
                        const list = get(data, 'courses.list');



                        return (

                            <div>
                                <Table
                                    className="hidden-mb"
                                    loading={loading}
                                    columns={columns}
                                    dataSource={list}
                                    onChange={this.handleChange}
                                    style={{ margin: '1rem', 'minHeight': '300px' }}
                                />
                                <List
                                    className="visible-block-mobile container"
                                    itemLayout="horizontal"
                                    dataSource={course}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={
                                                    <div
                                                        className="flex-between" style={{ padding: '0 1rem', 'align-items': 'center' }}
                                                    >
                                                        <div>
                                                            <a href="" style={{ color: '#111' }}>
                                                                {item.title}
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <Button type="primary">关注</Button>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

