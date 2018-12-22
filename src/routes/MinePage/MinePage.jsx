/** 用户信息页面 */
import React, { Component } from 'react';
import InformationCard from 'Components/MinePage/InformationCard';
import MyHomeTab from 'Components/MinePage/MyHomeTab';
import { GET_CURRENT_USER } from 'Queries/users.js';
import { Query } from 'react-apollo';
import get from 'Utils/get';

class MinePage extends Component {
    state = {}
    render() {
        return (
            <Query
                query={GET_CURRENT_USER}
            >
                {
                    ({ data, loading }) => {
                        const user = get(data, 'user') || {};

                        return (
                            <div>
                                < InformationCard user={user} />
                                < MyHomeTab history={this.props.history} user={user} />
                            </div>
                        );
                    }
                }
            </Query>
        );
    }
}

export default MinePage;