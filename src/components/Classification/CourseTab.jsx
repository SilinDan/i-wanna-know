/** 废弃 */
import React, { Component } from 'react';
import { Tabs, Radio } from 'antd';
import CourseTable from './CourseTable';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'Utils/get';

const GET_MAJORS = gql`
  query MajorsQuery($departmentId: String!) {
    majors: MajorsQuery(departmentId: $departmentId) {
        list {
            name
            _id
        }
        total
    }
  }
`;

const TabPane = Tabs.TabPane;

export default class CourseTab extends Component {
    render() {

        return (
            <Query
                variables={{ departmentId: this.props.departmentId }}
                query={GET_MAJORS}
            >
                {
                    ({ data, loading }) => {
                        const list = get(data, 'majors.list') || [];

                        return (
                            <div id="CourseTab-dd">
                                <Tabs
                                    defaultActiveKey="1"
                                >
                                    {
                                        list.map((major) => (
                                            <TabPane tab={major.name} key={major._id}>
                                                <CourseTable majorId={major._id} />
                                            </TabPane>
                                        ))
                                    }
                                </Tabs>
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

