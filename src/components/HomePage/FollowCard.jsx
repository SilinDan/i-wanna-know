import React, { Component } from 'react';
import { Card } from 'antd';
import './FollowCard.less';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
};

export default class FollowCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="FollowCard-dd">

                <Card>
                    <Card.Grid style={gridStyle}><span>5000</span><br />关注我的人</Card.Grid>
                    <Card.Grid style={gridStyle}><span>200</span><br />我关注的人</Card.Grid>
                </Card>
            </div>
        );
    }
}


