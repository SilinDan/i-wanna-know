import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import CourseCollapse from '../../components/Classification/CourseCollapse';
import FollowAll from '../../components/Classification/FollowAll';
import styles from './Classification.less';

export default class Classification extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div id="classification-dd" >
                <FollowAll />
                <CourseCollapse />
            </div>
        );
    }
}
