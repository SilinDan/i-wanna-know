import React, { Component } from 'react';
import { List, Avatar, Button, Divider } from 'antd';
import FollowCourseButton from '../Common/FollowCourseButton';
import { Query } from 'react-apollo';
import get from 'Utils/get';
import { GET_FOLLOWED_COURSES } from 'Queries/classifications';
import PropTypes from 'prop-types';

export default class CourseFollowed extends Component {
    static propType = {
        id: PropTypes.string.isRequired,
    }

    render() {
        return (
            <Query
                query={GET_FOLLOWED_COURSES}
                variables={
                    {
                        userId: this.props.id
                    }
                }
            >
                {
                    ({ data, loading, refetch }) => {
                        const list = get(data, 'followedCourses.list') || [];

                        return (

                            <List id="FollowList-dd"
                                style={{ background: '#fff' }}
                                itemLayout="horizontal"
                                dataSource={list}
                                loading={loading}
                                renderItem={item => (
                                    <List.Item >
                                        <List.Item.Meta
                                            style={{ padding: '0rem 1rem' }}
                                            title=
                                            {
                                                <div className="flexfollow-dd">
                                                    <div><a href="">{item.name}</a> </div>
                                                    <div className="follow-button">
                                                        {/* <Button type="primary" style={{ marginTop: '0.5rem' }}>已关注</Button> */}
                                                        <FollowCourseButton refetch={refetch} classification={item} />
                                                    </div>
                                                </div>
                                            }
                                            description=
                                            {
                                                <div className="description-dd">
                                                    <strong>{item.questionsNum}</strong>个问题  <strong>{item.followedNum}</strong>个关注者
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        );
                    }
                }

            </Query>
        );
    }
}
