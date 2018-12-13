import React, { Component } from 'react';
import { Collapse } from 'antd';
import './CourseCollapse.less';
import CourseTab from './CourseTab';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'Utils/get';

const GET_DEPARTMENTS = gql`
  query DepartmentsQuery {
      departments: DepartmentsQuery {
          list {
              name
              _id
          }
          total
      }
  }
`;


const Panel = Collapse.Panel;

export default class FollowAll extends Component {
    render() {
        return (
            <Query
                query={GET_DEPARTMENTS}
            >
                {
                    ({ data, loading }) => {
                        const list = get(data, 'departments.list') || [];

                        return (
                            <div id="CourseCollapse-dd">
                                <Collapse bordered={false}>
                                    <Panel header="公共课" key="1" />
                                    {
                                        list.map((department) => (
                                            <Panel header={department.name} key={department._id}>
                                                <CourseTab departmentId={department._id} />
                                            </Panel>
                                        ))
                                    }
                                </Collapse>
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

