import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar, Tag, Button } from 'antd';
import './InformationCard.less';
import FollowCard from 'Components/HomePage/FollowCard';
import AlterInformation from 'Components/HomePage/AlterInformation';
import { DEFAULT_ICON } from 'Utils/constance.js';

const { Meta } = Card;

export default class InformationCard extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    render() {
        const user = this.props.user || {};
        const student = (
            <Tag color="#108ee9">学 生</Tag>
        );
        const teacher = (
            <Tag color="#faad14">老 师</Tag>
        );

        return (
            <div className="information-card-dd">
                <Card className="hidden-mb">
                    <Meta
                        avatar={<Avatar size={84} src={user.icon ? user.icon : DEFAULT_ICON} />}
                        title={(
                            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
                                <div>{user.name} {user.group === 'Student' ? student : teacher}</div>
                                {user._id === this.props.id ? <Button>关注</Button> : <AlterInformation />}
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
                            avatar={<Avatar size={50} src={user.icon ? user.icon : DEFAULT_ICON} />}
                            title={
                                <div>
                                    {user.name} {user.group === 'Student' ? student : teacher}
                                </div>}
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
