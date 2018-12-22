import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { Query } from 'react-apollo';
import { GET_INFORMATION } from 'Queries/information';
import { SERVER_ADDRESS } from 'Utils/constance';
import get from 'Utils/get';
import { formatDate } from 'Utils/utils';
import { Link, withRouter } from 'dva/router';


class NoticeList extends Component {
    static propTypes = {
        type: PropTypes.array.isRequired,
    }


    getNotice(item) {
        let info = '';
        let url = '';
        const { history } = this.props;

        switch (item.type) {
            case 'Answer': {
                info = (
                    <div>
                        <Link to={`/home/${item.user.id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 回答了你的问题
                        <Link to={`/question/${item.question._id}`}>
                            《 {item.question.title} 》
                        </Link>
                    </div>
                );
                url = `/AnswerDetail/${item.answer._id}`;
                break;
            }

            case 'Like': {
                info = (
                    <div>
                        <Link to={`/home/${item.user.id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 喜欢了你在问题
                        <Link to={`/question/${item.question._id}`}>
                            《 {item.question.title} 》
                        </Link> 下的回答
                    </div>
                );
                break;
            }

            case 'Follow': {
                info = (
                    <div>
                        <Link to={`/home/${item.user.id}`}>
                            <strong>{item.user.name}</strong>
                        </Link> 关注了你
                    </div>
                );
                break;
            }

            case 'Reply': {
                info = (
                    <div>
                        <Link to={`/home/${item.user.id}`}>
                            <strong>{item.user.name}</strong>
                        </Link>
                        回复了你: {item.reply.content}
                    </div>
                );
                url = `/AnswerDetail/${item.answer._id}`;
                break;
            }

            case 'Invite': {
                info = (
                    <div>
                        <Link to={`/home/${item.user.id}`}>
                            <strong>{item.user.name}</strong>
                        </Link>
                        邀请你回答
                        <Link to={`/question/${item.question._id}`}>《{item.question.title}》</Link>
                    </div>
                );
                url = `/question/${item.question._id}`;
                break;
            }

        }

        return (
            <List.Item onClick={() => url ? history.push(url) : null}>
                <List.Item.Meta
                    avatar={
                        item.user.icon ?
                            <Avatar src={`${SERVER_ADDRESS}/uploads/icons/${item.user.icon}`} /> :
                            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    }
                    title={formatDate(item.time)}
                    description={info}
                />
            </List.Item>
        );
    }

    render() {
        const { type } = this.props;

        return (
            <Query
                query={GET_INFORMATION}
                variables={{
                    type
                }}
            >
                {
                    ({ data, loading }) => {
                        const list = get(data, 'information.list') || {};

                        return (
                            <List
                                loading={loading}
                                itemLayout="horizontal"
                                dataSource={list}
                                renderItem={(item) => this.getNotice(item)}
                            />
                        );
                    }
                }
            </Query>
        );
    }
}

export default withRouter(NoticeList);
