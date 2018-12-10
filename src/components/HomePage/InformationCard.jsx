import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar, Button } from 'antd';
import './InformationCard.less';
import FollowCard from 'Components/HomePage/FollowCard';
import AlterInformation from 'Components/HomePage/AlterInformation';

const { Meta } = Card;

export default class InformationCard extends Component {

    render() {
        return (
            <div className="information-card-dd">
                <Card className="hidden-mb">
                    <Meta
                        avatar={<Avatar size={84} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={(
                            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
                                京蜜
                                <AlterInformation />
                            </div>
                        )}

                        description={
                            <div className="description-dd">
                                <Icon type="home" theme="filled" className="idcard-dd" />
                                计算机学院 <span>|</span>软件工程
                                <br />
                                <Icon type="idcard" theme="filled" className="idcard-dd" />
                                沙关在沙漠，星星死在天上，名字葬在咽喉
                            </div>
                        }
                    // description={<DescriptionCollapse />}
                    />
                </Card>

                {/* 手机版 */}
                <div className="hidden-desktop hidden-tablet">
                    <Card

                        bordered={false}
                    >
                        <Meta
                            avatar={<Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="京蜜"
                            description={
                                <div >
                                    <span className="introduce-mb">沙关在沙漠，星星死在天上……</span>
                                </div>
                            }
                        />
                    </Card>
                    <div className="followAndAlter">
                        <FollowCard />
                        <AlterInformation />
                    </div>
                </div>
            </div>
        );
    }
}
