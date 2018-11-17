/** 用户信息页面 */
import React, { Component } from 'react';
import { Input, Card, Form, Switch, Button, Radio } from 'antd';
import Student from 'Components/UserPage/Student';
import Teacher from 'Components/UserPage/Teacher';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    md: { span: 1 },
  },
  wrapperCol: {
    md: { span: 6, offset: 1 },
  },
};

class UserPage extends Component {
  state = {}
  render() {
    return (
      <Card>
        <Form>
          <h3>个人信息</h3>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            <Input value="姓名" disabled />
          </FormItem>
          <FormItem
            label="学号"
            {...formItemLayout}
          >
            <Input value="201541400000" disabled />
          </FormItem>
          <FormItem
            label="学院"
            {...formItemLayout}
          >
            <Input value="计算机与网络安全学院" disabled />
          </FormItem>
          <Student />
          <Teacher />
          <h3>账号信息</h3>
          <FormItem
            label="昵称"
            {...formItemLayout}
            required
          >
            <Input value="Windlike" />
          </FormItem>
          <Button type="primary">保存</Button>
        </Form>
      </Card>
    );
  }
}

export default UserPage;