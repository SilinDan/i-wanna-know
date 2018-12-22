import React, { Component } from 'react';
import CourseFollowed from 'Components/HomePage/CourseFollowed';
import get from 'Utils/get';

export default class HomeCourse extends Component {


    render() {
        const { history } = this.props;
        const id = get(this.props, 'match.params.userId') || '';

        return (
            <CourseFollowed history={history} id={id} />
        );
    }
}
