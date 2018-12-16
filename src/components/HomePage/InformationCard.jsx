import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar, message, Button } from 'antd';
import './InformationCard.less';
import FollowCard from 'Components/HomePage/FollowCard';
import AlterInformation from 'Components/HomePage/AlterInformation';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance.js';
import { Query } from 'react-apollo';
import UserTag from 'Components/Common/UserTag';
import get from 'Utils/get';
import { GET_CURRENT_USER } from 'Queries/users';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const FOLLOW_USER = gql`
    mutation followUser($followedUserId: String!){
        message:followUser(followedUserId: $followedUserId){
            code
            message
        }
    } 
`;

const { Meta } = Card;

export default class InformationCard extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
    }
    handleClick = (followUser, client) => {
        followUser().then(({ data }) => {
            if (data.message.code === 200) {
                message.success(data.message.message);

            } else {
                message.error(data.message.message);
            }
        });
    }


    render() {
        const user = this.props.user || {};
        const id = this.props.id || 'default';

        return (
            <Query query={GET_CURRENT_USER} fetchPolicy="network-only">

                {
                    ({ data }) => {
                        const currentUser = get(data, 'user') || {};

                        return (

                            <div className="information-card-dd">
                                <Mutation mutation={FOLLOW_USER}>
                                    {
                                        (followUser, { data, client }) => {
                                            return (

                                                <Card className="hidden-mb">
                                                    <Meta
                                                        avatar={
                                                            <Avatar
                                                                size={84}
                                                                src={user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON} />
                                                        }
                                                        title={(
                                                            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
                                                                <div>{user.name} <UserTag group={user.group} /></div>
                                                                {
                                                                    currentUser.id === user.id || user.id === 'default' ?
                                                                        (
                                                                            <AlterInformation user={user} id={id} />
                                                                        ) :
                                                                        (
                                                                            <Button
                                                                                type="primary"
                                                                                onClick={e => this.handleClick(followUser, client)}
                                                                            >关注
                                                                        </Button>
                                                                        )
                                                                }
                                                            </div>
                                                        )}
                                                        description={
                                                            <div className="description-dd">
                                                                <Icon type="home" theme="filled" className="idcard-dd" />

                                                                <span className="ell">{user.department} | {user.major} | {user.class}</span>
                                                                <br />
                                                                <Icon type="idcard" theme="filled" className="idcard-dd" />
                                                                <span className="ell">{user.text}</span>
                                                            </div>
                                                        }
                                                    />
                                                </Card>
                                            );
                                        }
                                    }
                                </Mutation>

                                {/* 手机版 */}

                                <div className="hidden-desktop hidden-tablet">
                                    <Card
                                        bordered={false}
                                    >
                                        <Meta
                                            avatar={<Avatar size={68} src={user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON} />}
                                            title={
                                                <div>
                                                    {user.name} <UserTag group={user.group} />
                                                </div>}
                                            description={
                                                <div >
                                                    <p className="introduce-mb ell">{user.text}</p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                    <div className="followAndAlter">
                                        <FollowCard user={user} />

                                        {
                                            currentUser.id === user.id || user.id === 'default' ? (
                                                <AlterInformation user={user} id={id} />
                                            ) : (<Button type="primary">关注</Button>)
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </Query>

        );
    }
}
