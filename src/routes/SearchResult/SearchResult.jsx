import React, { Component } from 'react';
import SearchInput from 'Components/SearchPage/SearchInput';
import SearchQuestion from 'Components/SearchPage/SearchQuestion';
import get from 'Utils/get';

export default class SearchResult extends Component {

    render() {
        const word = get(this.props.match, 'params.word');

        return (
            <div style={{ background: '#fff', padding: '1rem' }}>
                <SearchInput />

                <SearchQuestion word={word} />
            </div>
        );
    }
}