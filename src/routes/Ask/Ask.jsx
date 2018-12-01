/** 提问页 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'Components/Modal/Modal';
import PublishModal from 'Components/PublishModal/PublishModal';
import { Input, Select, Button, message } from 'antd';
import 'antd/lib/upload/style/css';
import { browserHistory } from 'dva/router';
// import LzEditor from 'react-lz-editor';
import Editor from 'braft-editor';
import 'braft-editor/dist/index.css';
import handleSuccess from 'Utils/successes';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './Ask.less';
import { SERVER_ADDRESS } from 'Utils/constance';

const { Option } = Select;
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
    fileList: []
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleContetnChange = value => {
    this.setState({ content: value });
  };

  handleClassificationSelect = id => {
    this.setState({ classificationId: id });
  };

  showPublishModal = () => {
    if (!this.state.title) {
      message.error('请填写标题哦');
    } else if (!this.state.content) {
      message.error('内容必须填写哦');
    } else {
      this.setState({ isShowPublishModal: true });
    }
  };

  hidePublishModal = () => {
    this.setState({ isShowPublishModal: false });
  };

  publish = createQuestion => {
    const { title, content, classificationId } = this.state;
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

  handlePublishSuccess = ({ data }) => {
    if (handleSuccess(data)) {
      this.props.history.replace('/');
    }
  };

  handleUpload = (info) => {
    console.log(info);
    if (info.file.status === 'done') {
      info.fileList[info.fileList.length - 1].url = `${SERVER_ADDRESS}/uploads/assets/${info.file.response.name}`;
    }
    this.setState({ fileList: info.fileList });
  }

  render() {
    const { fileList } = this.state;

    return (
      <Mutation
        onCompleted={this.handlePublishSuccess}
        mutation={CREATE_QUESTION}>
        {(createQuestion, { data }) => (
          <div>
            <input
              value={this.state.title}
              onChange={this.handleTitleChange}
              placeholder="标题"
              type="text"
              className={styles['input-title']}
            />
            <Editor />
            {/* <LzEditor
              importContent={this.state.content}
              className="maring-bottom-md"
              active={true}
              cbReceiver={this.handleContetnChange}
              uploadProps={{
                action: `${SERVER_ADDRESS}/uploads`,
                onChange: this.handleUpload,
                showUploadList: true,
                listType: 'picture',
                fileList
              }}
              convertFormat="markdown"
              removeStyle={false}
            /> */}
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
