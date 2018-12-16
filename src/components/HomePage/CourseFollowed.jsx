import React, { Component } from 'react';
import { List, Avatar, Button, Divider } from 'antd';
import FollowCourseButton from '../Common/FollowCourseButton';
import { Query } from 'react-apollo';
import get from 'Utils/get';
import { GET_FOLLOWED_COURSES } from 'Queries/classifications';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
export default class CourseFollowed extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
    }

    render() {
        return (
            <Query
                fetchPolicy="network-only"
                skip={!this.props.id}
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
                                    // <Link to="/course/:_id">
                                    <List.Item
                                        onClick={(e) => {
                                            this.props.history.push(`/course/${item._id}`);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <List.Item.Meta
                                            style={{ padding: '0rem 1rem' }}
                                            title=
                                            {
                                                <div className="flexfollow-dd">
                                                    <div className="color-primary">{item.name}</div>
                                                    <div className="follow-button margin-top-md">
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
