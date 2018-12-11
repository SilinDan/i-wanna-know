/** 用户信息页面 */
import React, { Component } from 'react';
import { Input, Card, Form, Switch, Button, Radio } from 'antd';
import InformationCard from 'Components/HomePage/InformationCard';
import MyHomeTab from 'Components/HomePage/MyHomeTab';
import FollowCard from 'Components/HomePage/FollowCard';
import { GET_CURRENT_USER } from 'Queries/users.js';
import { Query } from 'react-apollo';
import get from 'Utils/get';
import styles from './HomePage.less';

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

class HomePage extends Component {
    state = {}
    render() {
        const id = this.props.match.params.userId;

        return (

            <Query
                query={GET_CURRENT_USER}
                variables={{ id }}
            >
                {
                    ({ data }) => {
                        const user = get(data, 'user') || {};

                        return (
                            <div className={styles['flex-box-between']}>
                                <div className={styles['left']}>
                                    < InformationCard user={user} />
                                    < MyHomeTab />
                                </div>
                                <div className={`${styles['right']} hidden-mb`}>
                                    <FollowCard user={user} />
                                </div>
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

export default HomePage;