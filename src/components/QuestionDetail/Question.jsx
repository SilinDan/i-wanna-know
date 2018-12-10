/** 问题详情的问题组件 */
import React, { Component } from 'react';
import styles from './Question.less';
import { Icon, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { formatDate, createMarkup } from 'Utils/utils';
import hljs from 'highlight.js/lib/highlight';
import { shallowCompare } from 'windlike-utils/dist/object';

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

  shouldComponentUpdate(preProps) {
    if (shallowCompare(preProps.question, this.props.question)) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  state = {};

  render() {
    const { question } = this.props;

    return (
      <Card>
        <h2 className={styles.title}>{question.title}</h2>
        <p className={styles.time}>
          <Icon type="clock-circle" />
          {formatDate(question.createdTime)}
        </p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={createMarkup(question.content)} />
        <Button className="margin-right-sm" type="primary">
          <Icon type="highlight" />写回答
        </Button>
        <Button style={{ color: '#40a9ff', 'borderColor': '#40a9ff' }}>
          <Icon type="user-add" />邀请回答
        </Button>

      </Card>
    );
  }
}

export default Question;
