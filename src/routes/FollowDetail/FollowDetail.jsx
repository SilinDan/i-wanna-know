import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import FollowTab from 'Components/FollowPage/FollowTab';
export default class FollowDetail extends Component {


    render() {
        return (
            <div style={{ background: '#fff', padding: '1rem' }}>
                <FollowTab />
            </div>
        );
    }
}
