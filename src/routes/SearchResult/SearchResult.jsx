import React, { Component } from 'react';
import SearchInput from 'Components/SearchPage/SearchInput';
import SearchQuestion from 'Components/SearchPage/SearchQuestion';
import SearchCourse from 'Components/SearchPage/SearchCourse';

import get from 'Utils/get';

export default class SearchResult extends Component {

    render() {
        const word = get(this.props.match, 'params.word');

        return (
            <div style={{ background: '#fff', padding: '1rem' }}>
                <SearchInput />
                <SearchCourse />
                <SearchQuestion word={word} />
            </div>
        );
    }
}