import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar, } from 'antd';
import './TrendsCard.less';

const { Meta } = Card;

export default class TrendsCard extends Component {
    state = {
        loading: false,
    }

    onChange = (checked) => {
        this.setState({ loading: !checked });
    }

    render() {
        const { loading } = this.state;

        return (
            <div>

                <Card className="TrendsCard-dd">
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={
                            <div>京蜜<span>关注了</span>
                                后排的风过
                            </div>}
                        description="1天前"
                    />
                </Card>

                <Card className="TrendsCard-dd">
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={
                            <div style={{ whiteSpace: 'normal' }}>
                                京蜜<span>点赞了回答</span>
                                《为什么函数式编程是最好的》
                            </div>}
                        description="1天前"
                    />
                </Card>


            </div>
        );
    }
}