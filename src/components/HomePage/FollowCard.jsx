import React, { Component } from 'react';
import { Card } from 'antd';
import './FollowCard.less';
import { withRouter, Link } from 'dva/router';
import PropTypes from 'prop-types';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    cursor: 'pointer'
};

class FollowCard extends Component {
    constructor(props) {
        super(props);

    }

    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    handleClick = (index) => {
        this.props.history.push({
            pathname: `/follow/${this.props.user.id}`,
            state: { index }
        });
    }

    render() {
        const user = this.props.user || {};

        return (
            <div>
                <div className="FollowCard-dd hidden-mb">
                    <Card>
                        <Card.Grid style={gridStyle} onClick={() => this.handleClick(1)}>
                            <span>{user.followsNum}</span>
                            <br />关注
                        </Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => this.handleClick(2)}>
                            <span>{user.followersNum}</span>
                            <br />关注者
                        </Card.Grid>
                    </Card>
                </div>
                {/* 下面手机端 */}
                <div className="hidden-desktop hidden-tablet">
                    <div className="follow-mb">
                        <Link to={{
                            pathname: `/follow/${user.id}`,
                            state: { index: 1 }
                        }}>
                            <div className="follow-mb-list">
                                <span className="number-follow">{user.followsNum}</span>
                                <br />
                                <span className="font-follow">关注</span>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/follow/${user.id}`,
                            state: { index: 2 }
                        }}>
                            <div className="follow-mb-list">
                                <span className="number-follow">{user.followersNum}</span>
                                <br />
                                <span className="font-follow">关注者</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(FollowCard);
