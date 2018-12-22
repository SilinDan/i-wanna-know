import React, { Component } from 'react';
import AnswerList from 'Components/HomePage/AnswerList';

export default class HomeAnswer extends Component {
    render() {
        const { userId } = this.props.match.params;
        const history = this.props.history;

        return (
            <AnswerList userId={userId} history={history} />
        );
    }
}
