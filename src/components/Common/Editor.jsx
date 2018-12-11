import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BraftEditor from 'braft-editor';
import { SERVER_ADDRESS } from 'Utils/constance';

export default class Editor extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    style: {}
  }

  handleUpload = (param) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const onSuccess = (response) => {
      const data = JSON.parse(xhr.responseText);
      const url = `${SERVER_ADDRESS}/uploads/assets/${data.name}`;

      param.success({
        url,
        meta: {
          id: data.name,
          title: param.file.name,
          alt: param.file.name,
          loop: false, // 指定音视频是否循环播放
          autoPlay: false, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      });
    };

    const onProgress = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100);
    };

    const onError = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      });
    };

    xhr.upload.addEventListener('progress', onProgress, false);
    xhr.addEventListener('load', onSuccess, false);
    xhr.addEventListener('error', onError, false);
    xhr.addEventListener('abort', onError, false);

    fd.append('file', param.file);
    xhr.open('POST', `${SERVER_ADDRESS}/uploads`, true);
    xhr.send(fd);
  }

  render() {
    return (
      <BraftEditor
        className={this.props.className}
        media={{
          uploadFn: this.handleUpload,
          accepts: {
            image: '*',
            video: '*',
            audio: '*'
          }
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        style={{ background: '#fff', border: '1px #ccc solid', ...this.props.style }} />
    );
  }
}
