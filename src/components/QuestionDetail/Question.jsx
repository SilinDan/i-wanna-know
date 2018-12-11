/** 问题详情的问题组件 */
import React, { Component } from 'react';
import styles from './Question.less';
import { Icon, Button, Card, Avatar, Tag } from 'antd';
import PropTypes from 'prop-types';
import { formatDate, createMarkup } from 'Utils/utils';
import hljs from 'highlight.js/lib/highlight';
import Editor from 'Components/Common/Editor';
import { DEFAULT_ICON } from 'Utils/constance';
import { shallowCompare } from 'windlike-utils/dist/object';
import { Link } from 'dva/router';
class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  static defaultProps = {
    question: {}
  }

  componentDidMount() {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  componentDidUpdate(preProps) {
    if (shallowCompare(preProps.question, this.props.question)) {
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();
    }
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
      <Card>
        <Link to={`/home/${user.id}`} className={styles.user}>
          <Avatar size="large" src={user.icon || DEFAULT_ICON} />
          <div className="margin-left-sm">
            <h3>{user.name}</h3>
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
          <Editor />
          <Button type="primary" className="margin-top-md">回答</Button>
        </div>
      </Card>
    );
  }
}

export default Question;
