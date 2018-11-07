import React, { Component } from 'react';
import { Modal, Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    md: { span: 4 },
  },
  wrapperCol: {
    md: { span: 16, offset: 1 },
  },
};

class AddClassModal extends Component {
    state = {}
    render() {
      return (
        <Modal
          title="添加班级"
          visible={this.props.visible}
        >
          <Form>
            <FormItem
              label="年级"
              {...formItemLayout}
              required
            >
              <Select defaultValue="2015">
                <Option value="2015">2015级</Option>
                <Option value="2016">2016级</Option>
                <Option value="2017">2017级</Option>
                <Option value="2018">2018级</Option>
              </Select>
            </FormItem>
            <FormItem
              label="班级"
              {...formItemLayout}
              required
            >
              <Select defaultValue="软件工程2班">
                <Option value="0">软件工程2班</Option>
              </Select>
            </FormItem>
            <FormItem
              label="分类"
              {...formItemLayout}
              required
            >
              <Select defaultValue="C++">
                <Option value="0">C++</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
      );
    }
}

export default AddClassModal;