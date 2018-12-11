import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './Detail.less';
import QuestionList from 'Components/IndexPage/QuestionList';
import { GET_COURSE } from 'Queries/classifications';
import get from 'Utils/get';
import Follow from 'Components/Classification/Follow';
import { Query } from 'react-apollo';
import { Link } from 'dva/router';


export default class Detail extends Component {

    render() {
        const _id = get(this.props.match, 'params._id');

        return (
            <Query
                query={GET_COURSE}
                variables={{ _id: _id }}
            >
                {
                    ({ data, loading }) => {
                        const course = get(data, 'course') || {};

                        return (
                            <div className={styles.detail} >
                                <div className={styles['course-name']}>
                                    <h1 className={styles.title}>{course.name}</h1>
                                    <p>{course.followedNum} 关注，{course.questionsNum} 问题</p>
                                </div>
                                <QuestionList
                                    extra={<div><a>热门</a> <a>最新</a></div>}
                                    title={(
                                        <span>
                                            <Follow classification={course} />
                                            <Link to={`/ask/${course._id}`} className="margin-left-md">
                                                <Button type="primary">提问</Button>
                                            </Link>
                                        </span>
                                    )}
                                    classificationId={_id}
                                />
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}
