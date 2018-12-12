import React, { Component } from 'react';
import styles from './Answer.less';
import { Link } from 'dva/router';
import { List, Avatar, Icon, Skeleton, Button } from 'antd';
import Prism from 'prismjs';
import { formatDate, createMarkup } from 'Utils/utils';
import { GET_ANSWERS } from 'Queries/answers';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import get from 'Utils/get';
import UserTag from 'Components/Common/UserTag';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';

window.Prism = Prism;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


class AnswerList extends Component {
    static propTypes = {
        questionId: PropTypes.string,
    }
    state = {

    };

    highlight = (container) => {
        if (container) {
            Prism.highlightAllUnder(container);
        }
    }

    render() {
        const { questionId } = this.props;

        return (
            <Query
                skip={!questionId}
                variables={{ questionId }}
                query={GET_ANSWERS}
            >
                {
                    ({ data, loading }) => {
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
                                    pageSize: 3,
                                    total: answers.total,
                                    hideOnSinglePage: true
                                }}
                                dataSource={list}
                                renderItem={item => (
                                    <React.Fragment>
                                        <List.Item
                                            key={item.title}
                                            actions={loading ? [] : [
                                                <IconText type="like-o" text="156" key="1" />,
                                                <IconText type="message" text="2" key="2" />,
                                            ]}

                                        >
                                            <Skeleton loading={loading} avatar paragraph={{ rows: 4 }} >
                                                <List.Item.Meta
                                                    title={
                                                        <React.Fragment>
                                                            <div>
                                                                <Link className={styles.name} to="/user/default">{item.user.name}</Link>
                                                                <UserTag group={item.user.group} />
                                                            </div>
                                                            <p className={styles.time}>
                                                                {formatDate(item.createdTime)}
                                                            </p>
                                                        </React.Fragment>
                                                    }
                                                    avatar={<Avatar size="large" src={item.user.icon ? `${SERVER_ADDRESS}/uploads/icons/${item.user.icon}` : DEFAULT_ICON} />}
                                                />
                                                <p ref={this.highlight} dangerouslySetInnerHTML={createMarkup(item.content)} />
                                            </Skeleton>
                                        </List.Item>
                                        <div className={styles.reply}>
                                            <Avatar src={item.user.icon ? `${SERVER_ADDRESS}/uploads/icons/${item.user.icon}` : DEFAULT_ICON} />
                                            <span className="margin-left-md">
                                                <h3>用户</h3>
                                                <p className="margin-top-sm">回复:你好呀</p>
                                                <p>2018-12-11 08:00:00</p>
                                            </span>
                                        </div>
                                    </React.Fragment>
                                )}

                            />
                        );
                    }
                }
            </Query>
        );
    }
}

export default AnswerList;
