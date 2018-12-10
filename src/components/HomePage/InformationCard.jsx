import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar, Button } from 'antd';
import './InformationCard.less';
import FollowCard from 'Components/HomePage/FollowCard';
import AlterInformation from 'Components/HomePage/AlterInformation';

const { Meta } = Card;

export default class InformationCard extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    render() {
        const user = this.props.user || {};

        return (
            <div className="information-card-dd">
                <Card className="hidden-mb">
                    <Meta
                        avatar={<Avatar size={84} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={(
                            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
                                {user.name}
                                <AlterInformation />
                            </div>
                        )}
                        description={
                            <div className="description-dd">
                                <Icon type="home" theme="filled" className="idcard-dd" />

                                <span className="ell">{user.department} | {user.major} | {user.class}</span>
                                <br />
                                <Icon type="idcard" theme="filled" className="idcard-dd" />
                                <span className="ell">沙关在沙漠，星星死在天上，名字葬在咽喉</span>
                            </div>
                        }
                    />
                </Card>

                {/* 手机版 */}
                <div className="hidden-desktop hidden-tablet">
                    <Card
                        bordered={false}
                    >
                        <Meta
                            avatar={<Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={user.name}
                            description={
                                <div >
                                    <p className="introduce-mb ell">沙关在沙漠，星星死在天上，名字葬在咽喉</p>
                                </div>
                            }
                        />
                    </Card>
                    <div className="followAndAlter">
                        <FollowCard user={user} />
                        <AlterInformation user={user} />
                    </div>
                </div>
            </div>

        );
    }
}
