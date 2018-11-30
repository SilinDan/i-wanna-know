import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';


function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
    </Menu>
);

export default class FollowAll extends Component {
    render() {
        return (
            <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                    Button <Icon type="down" />
                </Button>
            </Dropdown>
        );
    }
}

