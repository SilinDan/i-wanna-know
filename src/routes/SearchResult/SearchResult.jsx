import React, { Component } from 'react';
import SearchInput from 'Components/SearchPage/SearchInput';
import QuestionList from 'Components/IndexPage/QuestionList';
import SearchCourse from 'Components/SearchPage/SearchCourse';

import get from 'Utils/get';

export default class SearchResult extends Component {

    render() {
        const word = get(this.props.match, 'params.word');

        return (
            <div style={{ background: '#fff', padding: '1rem' }}>
                <SearchInput word={decodeURI(word)} history={this.props.history} />
                <SearchCourse word={decodeURI(word)} />
                <QuestionList word={decodeURI(word)} title="相关问题" />
            </div>
        );
    }
}