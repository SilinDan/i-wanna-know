import React, { Component } from 'react';
import { Card } from 'antd';
import './FollowCard.less';
import { Link } from 'dva/router';
import { userInfo } from 'os';
import PropTypes from 'prop-types';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
};

export default class FollowCard extends Component {
    constructor(props) {
        super(props);

    }

    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    render() {

        const user = this.props.user || {};

        return (
            <div>
                <div className="FollowCard-dd hidden-mb">
                    <Link to="/follow/default">
                        <Card>
                            <Card.Grid style={gridStyle}><span>{user.followsNum}</span><br />关注</Card.Grid>
                            <Card.Grid style={gridStyle}><span>{user.followersNum}</span><br />关注者</Card.Grid>
                        </Card>
                    </Link>
                </div>
                {/* 下面手机端 */}
                <div className="hidden-desktop hidden-tablet">
                    <Link to="/follow/default">
                        <div className="follow-mb">
                            <div className="follow-mb-list">
                                <span className="number-follow">{user.followsNum}</span>
                                <br />
                                <span className="font-follow">关注</span>
                            </div>
                            <div className="follow-mb-list">
                                <span className="number-follow">{user.followersNum}</span>
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


