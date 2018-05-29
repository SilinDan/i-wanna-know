import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'Components/Modal/Modal';
import { Input, Select, Button } from 'antd';
import LzEditor from 'react-lz-editor';
import styles from './Ask.less';

const { Option } = Select;

export default class Ask extends Component {
  static propTypes = {

  }

  handleRichTextChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div>
        <input 
        placeholder="标题"
        type="text" 
        className={styles['input-title']}/>
        <LzEditor
        className="maring-bottom-md"
        active={true}
        cbReceiver={this.handleRichTextChange}
        uploadProps={{
          action: '/upload'
        }}
        removeStyle={false}/>
        <Button type="primary" size="large" className={styles['btn-submit']}>发布</Button>
      </div>
    );
  }
}
