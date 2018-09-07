import React, { Component } from 'react';
import { Form, Switch, Input, Radio } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    md: { span: 1 },
  },
  wrapperCol: {
    md: { span: 6, offset: 1 },
  },
};

class Student extends Component {
  state = {}
  render() {
    return (
      <React.Fragment>
        <FormItem
          label="班级"
          {...formItemLayout}
        >
          <Input value="软件工程" disabled />
        </FormItem>
        <FormItem
          label="是否向他人展示以上信息"
          labelCol={{ span: 4, }}
          wrapperCol={{ span: 1, }}
        >
          <Switch />
        </FormItem>
        <FormItem
          label="性别"
          {...formItemLayout}
        >
          <RadioGroup>
            <Radio value={0}>男</Radio>
            <Radio value={1}>保密</Radio>
          </RadioGroup>

        </FormItem>
      </React.Fragment>
    );
  }
}

export default Student;