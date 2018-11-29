import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';

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
        const columns = [{
            title: '课程名',
            dataIndex: 'courseName',
            key: 'courseName',
            filters: [
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.courseName || null,
            onFilter: (value, record) => record.courseName.includes(value),
            sortOrder: sortedInfo.columnKey === 'courseName' && sortedInfo.order,
        }, {
            title: '类别',
            dataIndex: 'classification',
            key: 'classification',
            filters: [
                { text: '任选', value: '任选' },
                { text: '限选', value: '限选' },
            ],
            filteredValue: filteredInfo.classification || null,
            onFilter: (value, record) => record.classification.includes(value),
            sortOrder: sortedInfo.columnKey === 'classification' && sortedInfo.order,
        }, {
            title: '关注数',
            dataIndex: 'follow',
            key: 'follow',
            sorter: (a, b) => a.follow - b.follow,
            sortOrder: sortedInfo.columnKey === 'follow' && sortedInfo.order,
        }, {
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
            <div>
                <Table columns={columns} dataSource={data} onChange={this.handleChange} />
            </div>
        );
    }
}

