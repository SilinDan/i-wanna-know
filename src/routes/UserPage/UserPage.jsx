/** 用户信息页面 */
import React, { Component } from 'react';
import { Input, Card, Form, Upload, Icon, Button, Radio, message } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_CURRENT_USER } from '../../queries/users';
import get from 'Utils/get';
import { DEFAULT_ICON } from 'Utils/constance';
import styles from './UserPage.less';
import { client } from '../../index';
import { SERVER_ADDRESS } from 'Utils/constance';

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
const EDIT = gql`
  mutation edit($icon: String, $text: String) {
    message: edit(icon: $icon, text: $text) {
      code
      message
    }
  }
`;

function beforeUpload(file) {
  const types = ['image/jpeg', 'image/png', 'image/jpg'];
  const isJPG = types.includes(file.type);

  if (!isJPG) {
    message.error('只能上传图片文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('图片大小必须小于2MB');
  }

  return isJPG && isLt2M;
}

class UserPage extends Component {
  state = {
    icon: '',
    text: '',
    user: {}
  }

  componentWillMount() {
    client.query({
      query: GET_CURRENT_USER,
    }).then(({ data }) => {
      if (data.user) {
        this.setState({
          user: data.user,
          text: data.user.text
        });

      }
    });
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {

      const response = info.file.response;

      if (response.code === 200) {
        this.setState({ icon: response.name });
      }
    }
  }

  submit = (edit) => {
    edit({
      variables: {
        icon: this.state.icon,
        text: this.state.text
      }
    }).then(({ data }) => {
      if (data.message.code === 200) {
        message.success(data.message.message);
        this.props.history.replace('/home/default');
      }
    });
  }

  render() {
    const { icon, user } = this.state;

    return (
      <Mutation
        mutation={EDIT}
      >
        {
          (edit, { data, loading }) => {
            return (
              <Card>
                <Form>
                  <h3>账号信息</h3>
                  <FormItem
                    label="头像"
                  >
                    <Upload
                      beforeUpload={beforeUpload}
                      name="file"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action={`${SERVER_ADDRESS}/icons`}
                      onChange={this.handleChange}
                    >
                      {
                        <div className="christmas-hat">
                          <img
                            width="100"
                            height="100"
                            style={{ borderRadius: '50%' }}
                            src={icon ? `${SERVER_ADDRESS}/uploads/icons/${icon}` : user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON}
                            alt="avatar" />
                        </div>
                      }
                    </Upload>
                  </FormItem>
                  <FormItem
                    label="个性签名"
                  >
                    <Input
                      placeholder="写点什么吧~"
                      value={this.state.text}
                      onChange={(e) => this.setState({ text: e.target.value })} />
                  </FormItem>
                  <Button
                    onClick={() => this.submit(edit)}
                    loading={loading}
                    type="primary">保存</Button>
                </Form>
              </Card>

            );
          }
        }
      </Mutation>
    );
  }
}

export default UserPage;