/** 首页 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Query } from 'react-apollo';
import get from 'Utils/get';
import { GET_FOLLOWED_COURSES } from 'Queries/classifications';
import { GET_CURRENT_USER } from 'Queries/users';
import QuestionList from 'Components/IndexPage/QuestionList';
import AskButton from 'Components/IndexPage/AskButton';
import ClassificationList from 'Components/IndexPage/ClassificationList';

const TabPane = Tabs.TabPane;

export default class IndexPage extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <Query
        query={GET_CURRENT_USER}
      >
        {
          ({ data }) => {
            const user = get(data, 'user') || {};

            return (

              <Query
                skip={!user.id}
                query={GET_FOLLOWED_COURSES}
                variables={{ userId: user.id }}
              >
                {
                  ({ data, loading }) => {
                    const followedCourses = get(data, 'followedCourses') || {};
                    const list = followedCourses.list || [];

                    return (
                      <React.Fragment>
                        <Tabs
                          tabPosition="top"
                          tabBarStyle={{ marginBottom: 0 }}
                          style={{ background: '#fff' }}
                        >
                          <TabPane tab="我关注的" key="0">
                            <QuestionList />
                          </TabPane>
                          {
                            list.map((course) => (
                              <TabPane tab={course.name} key={course._id}>
                                <QuestionList classificationId={course._id} />
                              </TabPane>
                            )
                            )
                          }
                        </Tabs>
                        {/* <ClassificationList /> */}
                        {/* 手机提问按钮，暂时不用 */}
                        {/* <AskButton /> */}
                      </React.Fragment>
                    );
                  }
                }
              </Query>
            );
          }
        }
      </Query>
    );
  }
}
