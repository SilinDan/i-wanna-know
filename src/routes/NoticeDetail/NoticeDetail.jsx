import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import NoticeTab from 'Components/NoticePage/NoticeTab';

export default class NoticeDetail extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div style={{ background: '#fff', padding: '1rem' }}>
                <NoticeTab />
            </div>

        );
    }
}
