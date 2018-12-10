import React, { Component } from 'react';
import { Card } from 'antd';
import './FollowCard.less';
import { Link } from 'dva/router';

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
            <div>
                <div className="FollowCard-dd hidden-mb">
                    <Link to="/follow/default">
                        <Card>
                            <Card.Grid style={gridStyle}><span>5000</span><br />关注我的人</Card.Grid>
                            <Card.Grid style={gridStyle}><span>200</span><br />我关注的人</Card.Grid>
                        </Card>
                    </Link>
                </div>

                <div className="hidden-desktop hidden-tablet">
                    <Link to="/follow/default">
                        <div className="follow-mb">
                            <div className="follow-mb-list">
                                <span className="number-follow">1000000</span>
                                <br />
                                <span className="font-follow">关注</span>
                            </div>
                            <div className="follow-mb-list">
                                <span className="number-follow">100</span>
                                <br />
                                <span className="font-follow">关注者</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}


