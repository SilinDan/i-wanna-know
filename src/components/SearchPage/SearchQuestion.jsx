import React, { Component } from 'react';
import QuestionList from 'Components/IndexPage/QuestionList';
import { GET_COURSES } from 'Queries/classifications';
import PropTypes from 'prop-types';
import get from 'Utils/get';
import { Query } from 'react-apollo';


export default class SearchQuestion extends Component {
    static propTypes = {
        word: PropTypes.string.isRequired,
    }

    render() {

        return (
            <Query
                query={GET_COURSES}
                variables={{ name: this.props.word }}
            >
                {
                    ({ data, loading }) => {
                        return (
                            <QuestionList
                                title="相关问题"
                                extra=""
                                word={this.props.word}
                            />
                        );
                    }
                }
            </Query>
        );
    }
}
