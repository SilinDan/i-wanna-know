/** 用户信息页面 */
import React, { Component } from 'react';
import { Input, Card, Form, Switch, Button, Radio } from 'antd';
import InformationCard from 'Components/HomePage/InformationCard';
import MyHomeTab from 'Components/HomePage/MyHomeTab';
import FollowCard from 'Components/HomePage/FollowCard';

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
        return (
            <div>
                < InformationCard />
                <div className={styles['flex-box']}>
                    <FollowCard />
                    < MyHomeTab />
                </div>
            </div>
        );
    }
}

export default HomePage;