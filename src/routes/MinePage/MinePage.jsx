/** 用户信息页面 */
import React, { Component } from 'react';
import { Input, Card, Form, Switch, Button, Radio } from 'antd';
import InformationCard from 'Components/MinePage/InformationCard';
import MyHomeTab from 'Components/MinePage/MyHomeTab';

class HomePage extends Component {
    state = {}
    render() {
        return (
            <div>
                < InformationCard />
                < MyHomeTab />
            </div>
        );
    }
}

export default HomePage;