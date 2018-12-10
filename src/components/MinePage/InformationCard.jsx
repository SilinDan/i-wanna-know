import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Link } from 'dva/router';
import { GET_CURRENT_USER } from 'Queries/users.js';
import { Query } from 'react-apollo';
import get from 'Utils/get';
import { DEFAULT_ICON } from 'Utils/constance.js';

export default class InformationCard extends Component {

    render() {
        return (
            <Query
                query={GET_CURRENT_USER}
            >
                {
                    ({ data, loading }) => {
                        const user = get(data, 'user') || {};

                        return (

                            <Link to="/home/default">
                                <List>
                                    <List.Item arrow="horizontal"
                                        onClick={() => { }}
                                        style={{ padding: '1rem' }}
                                        thumb={
                                            <div>
                                                <img
                                                    src={user.icon ? user.icon : DEFAULT_ICON}
                                                    style={{ width: '40px', height: '40px' }}
                                                />
                                            </div>
                                        }
                                    >
                                        {user.name}
                                        <List.Item.Brief className="ell">
                                            {user.department} | {user.major} | {user.class}
                                        </List.Item.Brief>
                                    </List.Item>
                                </List>
                            </Link>
                        );
                    }
                }
            </Query>
        );
    }
}
