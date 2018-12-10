import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Link } from 'dva/router';

export default class InformationCard extends Component {

    render() {
        return (
            <Link to="/home/default">
                <List>
                    <List.Item arrow="horizontal"
                        onClick={() => { }}
                        style={{ padding: '1rem' }}
                        thumb={
                            <div>
                                <img
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt=""
                                    style={{ width: '40px', height: '40px' }}
                                />
                            </div>
                        }
                    >
                        京蜜 <List.Item.Brief>计算机学院</List.Item.Brief>
                    </List.Item>
                </List>
            </Link>
        );
    }
}
