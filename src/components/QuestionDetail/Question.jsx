/** 问题详情的问题组件 */
import React, { Component } from 'react';
import styles from './Question.less';
import { Icon, Button, Card, Avatar, Tag, message } from 'antd';
import PropTypes from 'prop-types';
import { formatDate, createMarkup } from 'Utils/utils';
import hljs from 'highlight.js/lib/highlight';
import Editor from 'Components/Common/Editor';
import { DEFAULT_ICON } from 'Utils/constance';
import { shallowCompare } from 'windlike-utils/dist/object';
import { Link } from 'dva/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import UserTag from 'Components/Common/UserTag';
import { client } from '../../index';

const ANSWER = gql`
  mutation answer($questionId: ID!, $content: String!) {
    message: answer(questionId: $questionId, content: $content) {
      code
      message
    }
  }
`;

class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  static defaultProps = {
    question: {}
  }

  state = {
    answerContent: {}
  }

  onAnswerChange = (value) => {
    this.setState({ answerContent: value });
  }

  componentDidMount() {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  componentDidUpdate(preProps) {
    if (preProps.question._id !== this.props.question._id) {
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();
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

  state = {
    isShowEditor: false
  };

  render() {
    const { question } = this.props;
    const user = question.user || {};
    const classification = question.classification || {};
    const { isShowEditor } = this.state;

    return (
      <Mutation
        mutation={ANSWER}
      >
        {
          (answer, { data }) => {
            return (
              <Card>
                <Link to={`/home/${user.id}`} className={styles.user}>
                  <Avatar size="large" src={user.icon || DEFAULT_ICON} />
                  <div className="margin-left-sm">
                    <div>
                      <h3 style={{ display: 'inline-block', marginRight: 8 }}>{user.name}</h3>
                      <UserTag group={user.group} />
                    </div>
                    <p className={styles.time}>{formatDate(question.createdTime)}</p>
                  </div>
                </Link>
                <h2 className={styles.title}>
                  {question.title}
                  <Link to={`/course/${classification._id}`} className="margin-left-sm">
                    <Tag color="cyan" >{classification.name}</Tag>
                  </Link>
                </h2>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={createMarkup(question.content)} />
                <Button
                  onClick={() => this.setState({ isShowEditor: true })}
                  className="margin-right-sm" type="primary">
                  <Icon type="highlight" />写回答
                </Button>
                <Button
                  style={{ color: '#40a9ff', 'borderColor': '#40a9ff' }}>
                  <Icon type="user-add" />邀请回答
                </Button>
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
            );
          }

        }
      </Mutation>
    );
  }
}

export default Question;
