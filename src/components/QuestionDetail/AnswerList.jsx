import React, { Component } from 'react';
import { List, Icon } from 'antd';
import { GET_ANSWERS } from 'Queries/answers';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import get from 'Utils/get';
import Answer from './Answer';

class AnswerList extends Component {
    static propTypes = {
        questionId: PropTypes.string,
    }

    state = {

    };

    render() {
        const { questionId } = this.props;

        return (
            <Query
                skip={!questionId}
                variables={{ questionId }}
                query={GET_ANSWERS}
            >
                {
                    ({ data, loading, refetch }) => {
                        const answers = get(data, 'answers') || {};
                        const list = answers.list || [];

                        return (

                            <List
                                className="answer-list"
                                itemLayout="vertical"
                                size="large"
                                locale={{
                                    emptyText: '还没有人回答呢，快来帮助下这可怜的家伙吧~'
                                }}
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 8,
                                    total: answers.total,
                                    hideOnSinglePage: true
                                }}
                                loading={loading}
                                dataSource={list}
                                renderItem={answer => <Answer answer={answer} loading={loading} refetch={refetch} />}
                            />
                        );
                    }
                }
            </Query>
        );
    }
}

export default AnswerList;
