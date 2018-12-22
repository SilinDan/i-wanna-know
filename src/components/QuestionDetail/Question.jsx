/** 问题详情的问题组件 */
import React, { Component } from 'react';
import styles from './Question.less';
import { Icon, Button, Card, Avatar, Tag, message } from 'antd';
import PropTypes from 'prop-types';
import { formatDate, createMarkup } from 'Utils/utils';
import Prism from 'prismjs';
import Editor from 'Components/Common/Editor';
import { GET_CURRENT_USER } from 'Queries/users';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import { Link } from 'dva/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import UserTag from 'Components/Common/UserTag';
import { client } from '../../index';
import FollowQuestionButton from 'Components/Common/FollowQuestionButton';
import InviteButton from './InviteButton';

const ANSWER = gql`
  mutation answer($questionId: ID!, $content: String!) {
    message: answer(questionId: $questionId, content: $content) {
      code
      message
    }
  }
`;

const gridStyle = {
  width: '50%',
  textAlign: 'center',
  padding: '.6rem 0',
  boxShadow: 'none',
  borderTop: '1px #eee solid'
};


class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  static defaultProps = {
    question: {
      user: {}
    }
  }

  state = {
    answerContent: {},
    currentUser: {},
    isShowEditor: false
  }

  componentDidMount() {
    client.query({
      query: GET_CURRENT_USER
    }).then(({ data }) => this.setState({ currentUser: data.user }));
  }

  onAnswerChange = (value) => {
    this.setState({ answerContent: value });
  }

  componentDidUpdate(preProps) {
    if (preProps.question._id !== this.props.question._id) {
      Prism.highlightAllUnder(this.container);
    }
  }

  handleAnswer = (answer) => {
    answer({
      variables: {
        questionId: this.props.question._id,
        content: this.state.answerContent.toHTML()
      }
    }).then(({ data }) => {
      if (data.message.code === 200) {
        message.success(data.message.message);
        this.setState({
          answerContent: {},
          isShowEditor: false,
        });
        client.reFetchObservableQueries();
      }
    });
  }

  render() {
    const { question, refetch } = this.props;
    const user = question.user || {};
    const classification = question.classification || {};
    const { isShowEditor, currentUser } = this.state;

    return (
      <Mutation
        mutation={ANSWER}
      >
        {
          (answer, { data }) => {
            return (
              <div>
                <Card>
                  {/* 用户 */}
                  <div className={styles.user}>
                    <Link to={`/home/${user.id}`} >
                      <Avatar size="large" src={user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON} />
                    </Link>
                    <div className="margin-left-sm">
                      <div>
                        <Link to={`/home/${user.id}`} >
                          <h3 style={{ display: 'inline-block', marginRight: 8 }}>{user.name}</h3>
                        </Link>
                        <UserTag group={user.group} />
                      </div>
                      <p className={styles.time}>{formatDate(question.createdTime)}</p>
                    </div>
                  </div>
                  {/* 问题 */}
                  <h2 className={styles.title}>
                    <Link
                      to={`/question/${question._id}`}
                      style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{question.title}</Link>
                    <Link to={`/course/${classification._id}`} className="margin-left-sm">
                      <Tag color="cyan" >{classification.name}</Tag>
                    </Link>
                  </h2>
                  <div
                    ref={(container) => this.container = container}
                    className={`${styles.content}`}
                    dangerouslySetInnerHTML={createMarkup(question.content)} />
                  {/* 按钮 */}
                  <Button
                    onClick={() => this.setState({ isShowEditor: true })}
                    className="margin-right-sm hidden-mb" type="primary">
                    <Icon type="highlight" />写回答
                  </Button>

                  <InviteButton classificationId={classification._id} questionId={question._id}>
                    <Button
                      style={{ color: '#40a9ff', 'borderColor': '#40a9ff' }}
                      className="margin-right-sm hidden-mb" >
                      <Icon type="user-add" />邀请回答
                    </Button>
                  </InviteButton>

                  {
                    currentUser.id === user.id ? null : (
                      <FollowQuestionButton
                        refetch={refetch}
                        questionId={question._id}
                        isFollowed={question.isFollowed}>
                        {
                          question.isFollowed ? (
                            <Button
                              type="danger"
                            >
                              <Icon type="user-add" />取消关注
                            </Button>
                          ) : (
                              <Button
                                style={{ color: '#40a9ff', 'borderColor': '#40a9ff' }}>
                                <Icon type="user-add" />关注问题
                              </Button>
                            )
                        }

                      </FollowQuestionButton>
                    )
                  }


                  {
                    currentUser.id === user.id ? (
                      <Link
                        to={{
                          pathname: '/ask/default',
                          state: {
                            _id: question._id,
                            title: question.title,
                            content: question.content
                          }
                        }}>
                        <Button
                          style={{ color: '#40a9ff', 'borderColor': '#40a9ff' }}>
                          <Icon type="edit" />编辑
                        </Button>
                      </Link>
                    ) : null
                  }
                  {/* 编辑器 */}
                  <div
                    style={{ display: isShowEditor ? 'block' : 'none' }}>
                    <div className={styles.close}>
                      <span
                        onClick={() => this.setState({ isShowEditor: false })}
                        className="pointer">收起</span>
                    </div>
                    <Editor value={this.state.answerContent} onChange={this.onAnswerChange} />
                    <Button
                      onClick={() => this.handleAnswer(answer)}
                      type="primary"
                      className="margin-top-md">回答</Button>
                  </div>
                </Card>
                {/* 手机端按钮 */}
                <div className="hidden-desktop hidden-tablet">
                  <Card bodyStyle={{ padding: '0' }} bordered={false}>
                    <Card.Grid
                      style={{ ...gridStyle, borderRight: '1px #eee solid' }}
                      onClick={() => this.setState({ isShowEditor: true })}>
                      <Icon type="highlight" />写回答
                  </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <InviteButton classificationId={classification._id} questionId={question._id}>
                        <Icon type="user-add" />邀请回答
                      </InviteButton>
                    </Card.Grid>
                  </Card>
                </div>
              </div>
            );
          }

        }
      </Mutation>
    );
  }
}

export default Question;
