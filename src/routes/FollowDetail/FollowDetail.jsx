import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import FollowTab from 'Components/FollowPage/FollowTab';

export default class FollowDetail extends Component {
    render() {
        const userId = this.props.match.params.userId;
        const index = this.props.history.location.state.index;

        return (
            <div style={{ background: '#fff', padding: '1rem' }}>
                <FollowTab userId={userId} index={index} />
            </div>
        );
    }
}
