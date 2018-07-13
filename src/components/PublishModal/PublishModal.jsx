import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'Components/Modal/Modal';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Select, Form } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const GET_CLASSIFICATIONS = gql`
  {
    classifications: ClassificationsQuery {
      _id
      name
    }
  }
`;

export default class PublishModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    handleClassificationSelect: PropTypes.func,
  }

  render() {
    const { visible } = this.props;

    return (
      <Query query={GET_CLASSIFICATIONS}>
        {
          ({ loading, error, data }) => {
            const { classifications } = data || {};

            return (
              <Modal
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                visible={visible}
                title="发布"
              >
                <Form>
                  <FormItem label="分类">
                    <Select
                      onChange={this.props.handleClassificationSelect}
                      defaultValue=""
                    >
                      <Option key="" value="">无</Option>
                      {
                        loading ? null : classifications && classifications.map((classification) => (
                          <Option key={classification._id} value={classification._id}>{classification.name}</Option>
                        ))
                      }
                    </Select>
                  </FormItem>
                </Form>
              </Modal>
            );
          }
        }
      </Query>
    );
  }
}
