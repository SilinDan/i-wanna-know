import React, { Component } from 'react';
import CourseTable from 'Components/Classification/CourseTable';
import { GET_COURSES } from 'Queries/classifications';
import PropTypes from 'prop-types';
import get from 'Utils/get';
import { Query } from 'react-apollo';


export default class SearchCourse extends Component {
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
                            <CourseTable
                                title="相关课程"
                                word={this.props.word}
                            />
                        );
                    }
                }
            </Query>
        );
    }
}
