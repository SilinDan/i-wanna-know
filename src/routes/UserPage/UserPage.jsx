/** 用户信息页面 */
import React, { Component } from 'react';
import { Input, Card, Form, Upload, Icon, Button, Radio } from 'antd';
import { Query } from 'react-apollo';
import { CurrentUserQuery } from 'Queries/users';
import { GET_CURRENT_USER } from '../../queries/users';
import get from 'Utils/get';
import { DEFAULT_ICON } from 'Utils/constance';
import styles from './UserPage.less';

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
      <Query
        query={GET_CURRENT_USER}
      >
        {
          ({ data, loading }) => {
            const user = get(data, 'user') || {};
            const uploadButton = (
              <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
            );

            return (

              <Card>
                <Form>
                  <h3>账号信息</h3>
                  <FormItem
                    label="头像"
                    required
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="//jsonplaceholder.typicode.com/posts/"
                      onChange={this.handleChange}
                    >
                      {
                        user.icon ?
                          <img width="100" src={user.icon} alt="avatar" /> :
                          <img width="100" src={DEFAULT_ICON} alt="avatar" />
                      }
                    </Upload>
                  </FormItem>
                  <FormItem
                    label="个性签名"
                  >
                    <Input placeholder="个性签名" />
                  </FormItem>
                  <Button type="primary">保存</Button>
                </Form>
              </Card>
            );
          }
        }
      </Query>
    );
  }
}

export default UserPage;