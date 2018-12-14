/** 用户信息页面 */
import React, { Component } from 'react';
import InformationCard from 'Components/MinePage/InformationCard';
import MyHomeTab from 'Components/MinePage/MyHomeTab';

class MinePage extends Component {
    state = {}
    render() {
        return (
            <div>
                < InformationCard />
                < MyHomeTab history={this.props.history} />
            </div>
        );
    }
}

export default MinePage;