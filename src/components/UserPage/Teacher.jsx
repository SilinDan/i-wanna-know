import React, { Component } from 'react';
import { Form, Select, Tag, Button, Icon } from 'antd';
import AddClassModal from './AddClassModal';

const FormItem = Form.Item;
const Option = Select.Option;
const tagColor = '#108ee9';

class Teacher extends Component {
  state = {
    isShowModal: false,
  }

  render() {
    return (
      <React.Fragment>
        <FormItem label="所教班级课程">
          <Tag color={tagColor} closable >2015-软件工程1班-C++</Tag>
          <Tag color={tagColor} closable >2015-软件工程2班-数据结构</Tag>
          <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> 添加班级课程
          </Tag>
        </FormItem>
        <AddClassModal visible={this.state.isShowModal} />
      </React.Fragment>
    );
  }
}

export default Teacher;
