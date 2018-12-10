import React, { Component } from 'react';
import styles from './Answer.less';
import { Link } from 'dva/router';
import { List, Avatar, Icon, Skeleton, Button } from 'antd';
import Comment from './Comment';

const listData = [];


for (let i = 0; i < 10; i++) {
    listData.push({
        title: `姓名 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: `回答${i}`,
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


class AnswerList extends Component {
    state = {
        loading: false
    };
    render() {
        const { loading } = this.state;

        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={loading ? [] : [
                                <IconText type="like-o" text="156" key="1" />,
                                <IconText type="message" text="2" key="2" />,
                            ]}

                        >
                            <Skeleton loading={loading} avatar paragraph={{ rows: 4 }} >
                                <List.Item.Meta
                                    title={<Link to="/user/default">{item.title}</Link>}
                                    avatar={<Avatar src={item.avatar} />}
                                />
                                {item.content}

                            </Skeleton>

                        </List.Item>
                    )}

                />
            </div>
        );
    }
}

export default AnswerList;
