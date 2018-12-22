import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { GET_FOLLOWED_USER, GET_FOLLOWERS } from 'Queries/users';
import { client } from '../../index';
import get from 'Utils/get';
import FollowList from './FollowList';

const TabPane = Tabs.TabPane;

export default class NoticeTab extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
        index: PropTypes.number,
    }

    state = {
        loading: false,
        followedUsers: {
            list: [],
            total: 0
        },
        followers: {
            list: [],
            total: 0
        }
    }

    componentDidMount() {
        const { userId, index } = this.props;

        this.setState({ loading: true });

        this.fetch(index);
    }

    fetch = (index) => {
        const { userId } = this.props;

        client.query({
            query: index === 1 ? GET_FOLLOWED_USER : GET_FOLLOWERS,
            variables: { userId }
        }).then(({ data }) => {
            const users = get(data, 'users') || {};

            if (index === 1) {
                this.setState({ followedUsers: users, loading: false });
            } else {
                this.setState({ followers: users, loading: false });
            }
        });
    }

    handleTabChange = (key) => {
        this.fetch(key * 1);
    }

    render() {
        const { userId, index } = this.props;
        const { followedUsers, followers, loading } = this.state;

        return (
            <Tabs defaultActiveKey={index + ''} onChange={this.handleTabChange} >
                <TabPane tab="我关注的人" key="1">
                    <FollowList users={followedUsers.list} loading={loading} />
                </TabPane>
                <TabPane tab="关注我的人" key="2">
                    <FollowList users={followers.list} loading={loading} />
                </TabPane>
            </Tabs>
        );
    }
}