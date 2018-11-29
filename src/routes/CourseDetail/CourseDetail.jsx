import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './Detail.less';
import CourseQuestionList from 'Components/DetailPage/CourseQuestionList';

export default class Detail extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div id="detail-dd" >
                <div className="course-name">
                    <h1>Linux操作系统</h1>
                    <p>121828 关注，4932 文章</p>
                </div>
                <CourseQuestionList />
            </div>
        );
    }
}
