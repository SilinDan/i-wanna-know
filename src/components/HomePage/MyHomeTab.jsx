import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Tabs } from 'antd';
import './MyHomeTab.less';
import TrendsList from './TrendsList';
import CourseFollowed from './CourseFollowed';
import { Link } from 'dva/router';
import QuestionList from 'Components/IndexPage/QuestionList';
import AnswerList from './AnswerList';
import LikedAnswersList from 'Components/LikedAnswers/LikedAnswersList';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

export default class MyHomeTab extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    }

    render() {
        const { history, user } = this.props;

        return (
            <div>
                {/* 电脑端 */}
                <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    className="MyHomeTab-dd hidden-mb"
                >
                    <TabPane tab="动态" key="1">
                        <TrendsList userId={user.id} />
                    </TabPane>
                    <TabPane tab={<div>提问({user.questionsNum})</div>} key="2">
                        <QuestionList userId={user.id} />
                    </TabPane>
                    <TabPane tab={<div>回答 ({user.answersNum})</div>} key="3">
                        <AnswerList userId={user.id || ''} history={history} />
                    </TabPane>
                    <TabPane tab={<div>关注的问题 ({user.followQuestionsNum})</div>} key="4"><QuestionList /></TabPane>
                    <TabPane tab={<div>关注的课程 ({user.followClassificationsNum})</div>} key="5">
                        <CourseFollowed history={history} id={user.id} />
                    </TabPane>
                    <TabPane tab={<div>赞过的回答 ({user.likesNum})</div>} key="6">
                        <LikedAnswersList history={history} userId={user.id} />
                    </TabPane>
                </Tabs>


                {/* 下面为手机端 */}
                <div className="hidden-desktop hidden-tablet">
                    <List
                        style={{ marginTop: '1rem' }}
                    >
                        <List.Item arrow="horizontal" onClick={() => { history.push(`/homeTrends/${user.id}`); }}>
                            动态
                        </List.Item>

                    </List>

                    <List style={{ marginTop: '1rem' }}>
                        <List.Item
                            arrow="horizontal"
                            onClick={() => { history.push(`/HomeQuestion/${user.id}`); }}
                            extra={user.questionsNum}
                        >
                            提问
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => { history.push(`/HomeAnswer/${user.id}`); }}
                            extra={user.answersNum}
                        >
                            回答
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            extra={user.followQuestionsNum}
                            onClick={() => history.push('/HomeQuestion/default')}
                        >
                            关注的问题
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => { history.push(`/HomeCourse/${user.id}`); }}
                            extra={user.followClassificationsNum}
                        >
                            关注的课程
                        </List.Item>

                    </List>

                    <List style={{ marginTop: '1rem' }}>
                        <List.Item
                            arrow="horizontal"
                            onClick={() => { history.push(`/LikedAnswers/${user.id}`); }}
                            extra={user.likesNum}
                        >
                            赞过的回答
                        </List.Item>
                    </List>
                </div>
            </div >
        );
    }
}
