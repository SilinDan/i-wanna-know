import React, { Component } from 'react';
import { Button, Icon, message } from 'antd';
import './FollowAll.less';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const FOLLOW_CURRENT_CLASSIFICATION = gql`
    mutation followCurrentClassifications{
        message: followCurrentClassifications{
            code
            message
        }
    }
`;

export default class FollowAll extends Component {
    handleClick = (followCurrentClassifications, client) => {
        followCurrentClassifications().then(({ data }) => {
            if (data.message.code === 200) {
                message.success(data.message.message);

            } else {
                message.error(data.message.message);
            }
        });
    }

    render() {
        return (
            <div id="FollowAll-dd">
                <div className="all-title">
                    <Icon type="ordered-list" />
                    <span>全部课程</span>
                </div>
                <Mutation
                    mutation={FOLLOW_CURRENT_CLASSIFICATION}
                >
                    {
                        (followCurrentClassifications, { data, loading, client }) => {

                            return (
                                <div>
                                    <Button
                                        disabled={loading}
                                        type="primary"
                                        style={{ color: 'white' }}
                                        onClick={e => this.handleClick(followCurrentClassifications, client)}
                                    >
                                        {/* TODO:添加一键关注数据 */}
                                        <Icon type="smile" />一键关注本学期课程
                                </Button>
                                </div>
                            );

                        }
                    }

                </Mutation>
            </div>
        );
    }
}

