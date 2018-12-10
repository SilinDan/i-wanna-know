import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { GET_COURSES } from 'Queries/classifications';

const FOLLOW_CLASSIFICATION = gql`
  mutation followClassification($_id: ID!) {
    message: followClassification(_id: $_id) {
        code
        message
    }
  }
`;

const CANCEL_CLASSIFICATION = gql`
mutation cancelFollowClassification($_id: ID!) {
  message: cancelFollowClassification(_id: $_id) {
      code
      message
  }
}
`;

export default class Follow extends Component {
    static propTypes = {
        classification: PropTypes.object.isRequired,
        majorId: PropTypes.string.isRequired,
    }

    followClassification(follow) {
        follow({
            variables:
                { _id: this.props.classification._id }
        });
    }

    cancelFollowClassification(cancel) {
        cancel({
            variables:
                { _id: this.props.classification._id }
        });
    }

    update = (cache, message, isFollowed) => {
        if (message.code === 200) {
            const { courses } = cache.readQuery({
                query: GET_COURSES,
                variables: {
                    majorId: this.props.majorId
                }
            });

            cache.writeQuery({
                query: GET_COURSES,
                data: {
                    list: courses.list.map((item) => {
                        if (item._id === this.props.classification._id) {
                            item.isFollowed = isFollowed;
                            if (isFollowed) {
                                item.followedNum++;
                            } else {
                                item.followedNum--;
                            }
                        }

                        return item;
                    }),
                    total: courses.total
                }
            });

        }
    }

    render() {
        const classification = this.props.classification || {};

        return (
            classification.isFollowed === false ? (
                <Mutation
                    update={
                        (cache, { data }) => {
                            const message = data.message;

                            this.update(cache, message, true);
                        }
                    }
                    mutation={FOLLOW_CLASSIFICATION}
                >

                    {
                        (followClassification, { data, loading }) => (
                            <Button
                                disabled={loading}
                                onClick={() => this.followClassification(followClassification)}
                                type="primary">关注</Button>
                        )
                    }
                </Mutation>

            ) : (
                    <Mutation
                        update={
                            (cache, { data }) => {
                                const message = data.message;

                                this.update(cache, message, false);
                            }
                        }
                        mutation={CANCEL_CLASSIFICATION}
                    >

                        {
                            (cancel, { data, loading }) => (
                                <Button
                                    disabled={loading}
                                    onClick={() => this.cancelFollowClassification(cancel)}
                                    type="danger">取关</Button>
                            )
                        }
                    </Mutation>
                )
        );
    }
}