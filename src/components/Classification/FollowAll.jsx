import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './FollowAll.less';


export default class FollowAll extends Component {
    render() {
        return (
            <div id="FollowAll-dd">
                <div className="all-title">
                    <Icon type="ordered-list" />
                    <span>全部课程</span>
                </div>
                <div>
                    <Button type="primary" style={{ color: 'white' }}>
                        +一键关注本学期课程
                        </Button>
                </div>
            </div>
        );
    }
}

