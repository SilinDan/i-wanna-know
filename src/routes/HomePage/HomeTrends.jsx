import React, { Component } from 'react';
import TrendsList from 'Components/HomePage/TrendsList';

export default class HomeTrends extends Component {

    render() {
        const userId = this.props.match.params.userId;

        return (
            <TrendsList userId={userId} />
        );
    }
}
