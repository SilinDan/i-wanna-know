import React, { Component } from 'react';
import { List, Button, Card } from 'antd';

const data = [
    {
        title: '计算机',
    },
    {
        title: '艺术',
    },
    {
        title: '大数据',
    },
    {
        title: '云计算',
    },
];

export default class CourseFollowed extends Component {

    render() {

        return (
            <Card title="相关课程" bordered={false}>
                <List id="FollowList-dd"
                    style={{ background: '#fff' }}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item >
                            <List.Item.Meta
                                style={{ padding: '0rem 1rem' }}
                                title=
                                {
                                    <div className="flexfollow-dd">
                                        <div><a href="">{item.title}</a> </div>
                                        <div className="follow-button">
                                            <Button type="primary" style={{ marginTop: '0.5rem' }}>关注</Button>
                                        </div>
                                    </div>
                                }
                                description=
                                {
                                    <div className="description-dd">
                                        <strong>2000</strong>个问题  <strong>2000</strong>个关注者
                                </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}
