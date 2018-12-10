import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './Detail.less';
import CourseQuestionList from 'Components/DetailPage/CourseQuestionList';
import { GET_COURSE } from 'Queries/classifications';
import get from 'Utils/get';
import { Query } from 'react-apollo';


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
                            <div id="detail-dd" >
                                <div className="course-name">
                                    <h1>{course.name}</h1>
                                    <p>{course.followedNum} 关注，{course.questionsNum} 问题</p>
                                </div>
                                <CourseQuestionList />
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}
