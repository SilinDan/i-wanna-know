import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './FollowAll.less';


export default class FollowAll extends Component {
    render() {
        return (
            // <div id="FollowAll-dd" style={{ flex: 1, background: '#fff', padding: '30px' }}>
            <div id="FollowAll-dd">
                <div><Icon type="ordered-list" /><span>所有课程</span></div>
                <div><a href="../"><Button><Icon type="plus" />一键关注本学期课程</Button></a></div>
            </div>
        );
    }
}

