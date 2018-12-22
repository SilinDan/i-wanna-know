import React, { Component } from 'react';
import { List, Card, } from 'antd';
import News from 'Components/Common/News';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import { formatDate } from 'Utils/utils';
import './TrendsCard.less';

const { Meta } = Card;

export default class TrendsCard extends Component {

    onChange = (checked) => {
        this.setState({ loading: !checked });
    }

    render() {
        const { news, loading } = this.props;
        const list = news.list || [];

        return (
            <List
                loading={loading}
                dataSource={list}
                locale={{ emptyText: '暂无数据' }}
                renderItem={(item) => {
                    let describe, icon, time, title, preview, to;

                    icon = item.user.icon ? `${SERVER_ADDRESS}/uploads/icons/${item.user.icon}` : DEFAULT_ICON;
                    time = formatDate(item.time);

                    switch (item.type) {
                        case 'Question': {
                            describe = `${item.user.name}发布了问题`;
                            title = item.question.title;
                            preview = item.question.preview;
                            to = `/question/${item.question._id}`;
                            break;
                        }
                        case 'Answer': {
                            describe = `${item.user.name}回答了问题`;
                            title = item.answer.question.title;
                            preview = item.answer.preview;
                            to = `/AnswerDetail/${item.answer._id}`;
                            break;
                        }
                    }

                    return (
                        <News
                            key={item._id}
                            describe={describe}
                            icon={icon}
                            time={time}
                            title={title}
                            preview={preview}
                            to={to}
                        />
                    );

                }}
             />
            // <div>

            //     <Card className="TrendsCard-dd">
            //         <Meta
            //             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            //             title={
            //                 <div>京蜜<span>关注了</span>
            //                     后排的风过
            //                 </div>}
            //             description="1天前"
            //         />
            //     </Card>

            //     <Card className="TrendsCard-dd">
            //         <Meta
            //             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            //             title={
            //                 <div style={{ whiteSpace: 'normal' }}>
            //                     京蜜<span>点赞了回答</span>
            //                     《为什么函数式编程是最好的》
            //                 </div>}
            //             description="1天前"
            //         />
            //     </Card>


            // </div>
        );
    }
}