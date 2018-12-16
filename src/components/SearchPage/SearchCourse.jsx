import React, { Component } from 'react';
import { List, Button, Card } from 'antd';
import './SearchCourse.less';
import { Query } from 'react-apollo';
import { GET_COURSES } from 'Queries/classifications';
import PropTypes from 'prop-types';
import get from 'Utils/get';
import FollowCourseButton from 'Components/Common/FollowCourseButton';
import { Link } from 'dva/router';


export default class CourseFollowed extends Component {
    static propTypes = {
        word: PropTypes.string,
    }


    render() {
        const word = this.props.word;

        return (
            <Query
                query={GET_COURSES}
                variables={{ name: word }}
            >
                {
                    ({ data, loading, refetch }) => {
                        const list = get(data, 'courses.list') || {};

                        return (
                            <Card title="相关课程" bordered={false} id="course-list-dd" >
                                <List
                                    loading={loading}
                                    style={{ background: '#fff' }}
                                    itemLayout="horizontal"
                                    dataSource={list}
                                    renderItem={item => (
                                        <Link to={`/course/${item._id}`}>
                                            <List.Item >
                                                <List.Item.Meta
                                                    style={{ padding: '0rem 1rem' }}
                                                    title=
                                                    {
                                                        <div className="flex-course-dd">
                                                            <div>{item.name}</div>
                                                            <div className="course-button">
                                                                <FollowCourseButton classification={item} refetch={refetch} />
                                                                {/* <Button type="primary" style={{ marginTop: '0.5rem' }}>关注</Button> */}
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
                                        </Link>
                                    )}
                                />
                            </Card>
                        );
                    }
                }
            </Query>
        );
    }
}
