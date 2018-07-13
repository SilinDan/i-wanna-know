/** 提问页 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'Components/Modal/Modal';
import PublishModal from 'Components/PublishModal/PublishModal';
import {Input, Select, Button, message} from 'antd';
import {browserHistory} from 'dva/router';
import LzEditor from 'react-lz-editor';
import handleSuccess from 'Utils/successes';
import {graphql, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import styles from './Ask.less';

const {Option} = Select;
const CREATE_QUESTION = gql`
  mutation createQuestion($input: QuestionInput!) {
    data: createQuestion(input: $input) {
      code
      message
    }
  }
`;

export default class Ask extends Component {
  static propTypes = {};

  state = {
    isShowPublishModal: false,
    title: '',
    content: '',
    classificationId: '',
  };

  handleTitleChange = e => {
    this.setState({title: e.target.value});
  };

  handleContetnChange = value => {
    this.setState({content: value});
  };

  handleClassificationSelect = id => {
    this.setState({classificationId: id});
  };

  showPublishModal = () => {
    if (!this.state.title) {
      message.error('请填写标题哦');
    } else if (!this.state.content) {
      message.error('内容必须填写哦');
    } else {
      this.setState({isShowPublishModal: true});
    }
  };

  hidePublishModal = () => {
    this.setState({isShowPublishModal: false});
  };

  publish = createQuestion => {
    const {title, content, classificationId} = this.state;
    const preview = content.replace(/<[^>]*>/g, '').substr(0, 140);

    createQuestion({
      variables: {
        input: {
          title,
          content,
          preview,
          classificationId,
        },
      },
    });
  };

  handlePublishSuccess = ({data}) => {
    if (handleSuccess(data)) {
      this.props.history.replace('/');
    }
  };

  render() {
    return (
      <Mutation
        onCompleted={this.handlePublishSuccess}
        mutation={CREATE_QUESTION}>
        {(createQuestion, {data}) => (
          <div>
            <input
              value={this.state.title}
              onChange={this.handleTitleChange}
              placeholder="标题"
              type="text"
              className={styles['input-title']}
            />
            <LzEditor
              value={this.state.content}
              className="maring-bottom-md"
              active={true}
              cbReceiver={this.handleContetnChange}
              uploadProps={{
                action: '/upload',
              }}
              removeStyle={false}
            />
            <Button
              onClick={this.showPublishModal}
              type="primary"
              size="large"
              className={styles['btn-submit']}>
              发布
            </Button>
            <PublishModal
              handleClassificationSelect={this.handleClassificationSelect}
              handleCancel={this.hidePublishModal}
              handleOk={() => this.publish(createQuestion)}
              visible={this.state.isShowPublishModal}
            />
          </div>
        )}
      </Mutation>
    );
  }
}
