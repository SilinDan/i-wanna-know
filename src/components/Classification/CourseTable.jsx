import React, { Component } from 'react';
import { Table, List } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'Utils/get';
import Follow from './Follow';
import { Link } from 'dva/router';
import { GET_COURSES } from 'Queries/classifications';

export default class CourseTable extends Component {
    state = {
        current: 1
    };

    handlePageChange = (page) => {
        this.setState({
            current: page,
        });
    }

    componentWillUpdate(nextProps) {
        if (this.props.majorId !== nextProps.majorId) {
            this.setState({ current: 1 });
        }
    }


    render() {

        const columns = [
            {
                title: '课程名',
                dataIndex: 'name',
                key: 'name',
                width: '50%',
                render: (name, record) => (<Link to={`/course/${record._id}`}>{name}</Link>)
            },
            {
                title: '关注数',
                dataIndex: 'followedNum',
                key: 'followedNum',
            },
            {

            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <span>
                        <Follow
                            classification={record}
                            majorId={this.props.majorId} />
                    </span>
                ),
            }
        ];

        return (
            <Query
                skip={!this.props.majorId}
                variables={{ majorId: this.props.majorId }}
                query={GET_COURSES}
            >
                {
                    ({ data, loading, refetch }) => {
                        const list = get(data, 'courses.list') || [];

                        return (
                            <div>
                                {/* TODO:没显示关注数 */}
                                <Table
                                    rowKey="_id"
                                    className="hidden-mb"
                                    loading={loading && this.props.majorId !== ''}
                                    columns={columns}
                                    pagination={{
                                        current: this.state.current,
                                        onChange: this.handlePageChange,
                                    }}
                                    dataSource={list}
                                    style={{ margin: '1rem', 'minHeight': '300px' }}

                                />
                                {/* <List>
                                    {
                                        list.map((item) => (
                                            <List.Item key={item._id} platform="android">
                                                <Link to={`/course/${item._id}`} style={{ color: 'inherit' }}>
                                                    <div className="flex-between" style={{ alignItems: 'center' }}>
                                                        <span style={{ fontSize: '.95rem' }}>
                                                            {item.name}
                                                        </span>
                                                        <span>
                                                            <Follow
                                                                classification={item}
                                                                majorId={this.props.majorId} />
                                                        </span>
                                                    </div>
                                                </Link>
                                            </List.Item>
                                        ))
                                    }
                                </List> */}
                                {/* TODO:每行都要有横线 */}

                                <List
                                    className="visible-block-mobile container"
                                    itemLayout="horizontal"
                                    dataSource={list}
                                    renderItem={item => (
                                        <Link to={`/course/${item._id}`}>
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={
                                                        <div
                                                            className="flex-between" style={{ padding: '0 1rem', 'alignItems': 'center' }}
                                                        >
                                                            <div>
                                                                {item.name}
                                                            </div>
                                                            <div
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                <Follow
                                                                    classification={item}
                                                                    majorId={this.props.majorId} />
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        </Link>
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
