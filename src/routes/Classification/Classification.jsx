import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import CourseCollapse from '../../components/Classification/CourseCollapse';
import DepartmentSelect from '../../components/Classification/DepartmentSelect';
import CourseTable from '../../components/Classification/CourseTable';

import FollowAll from '../../components/Classification/FollowAll';
import styles from './Classification.less';

export default class Classification extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div id="classification-dd">
                <FollowAll />
                <DepartmentSelect />
                <CourseTable />
            </div>
        );
    }
}
