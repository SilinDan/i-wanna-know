import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { Query } from 'react-apollo';
import { GET_INFORMATION } from 'Queries/information';
import { SERVER_ADDRESS } from 'Utils/constance';
import get from 'Utils/get';
import { formatDate } from 'Utils/utils';
import { Link } from 'dva/router';

const data = [
    {
        title: '2018年11月22日16:55',
    },
    {
        title: '2018年11月22日16:55',
    },
    {
        title: '2018年11月22日16:55',
    },
    {
        title: '2018年11月22日16:55',
    },
];

export default class NoticeList extends Component {

    getNotice(item) {
        let info = '';

        switch (item.type) {
            case 'Answer': {
                info = (
                    <div>
                        <Link to={`/home/${item.user._id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 回答了你的问题
                        <Link to={`/question/${item.question._id}`}>
                            《 {item.question.title} 》
                        </Link>
                    </div>
                );
                break;
            }

            case 'Like': {
                info = (
                    <div>
                        <Link to={`/home/${item.user._id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 喜欢了你在问题
                        <Link to={`/question/${item.question._id}`}>
                            《 {item.question.title} 》
                        </Link> 下的回答
                    </div>
                );
                break;
            }

            case 'Follow': {
                info = (
                    <div>
                        <Link to={`/home/${item.user._id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 关注了你
                    </div>
                );
                break;
            }

            case 'Reply': {
                info = (
                    <div>
                        <Link to={`/home/${item.user._id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 回复了你
                    </div>
                );
                break;
            }

        }

        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={`${SERVER_ADDRESS}/uploads/icons/${item.user.icon}`} />}
                    title={formatDate(item.time)}
                    description={info}
                />
            </List.Item>
        );
    }

    render() {
        return (
            <Query
                query={GET_INFORMATION}
                variables={{
                    type: ['Answer', 'Reply', 'Follow', 'Like']
                }}
            >
                {
                    ({ data, loading }) => {
                        const list = get(data, 'information.list') || {};

                        return (
                            <List
                                loading={loading}
                                itemLayout="horizontal"
                                dataSource={list}
                                renderItem={(item) => this.getNotice(item)}
                            />
                        );
                    }
                }
            </Query>
        );
    }
}