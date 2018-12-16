import React, { Component } from 'react';
import CourseFollowed from 'Components/HomePage/CourseFollowed';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from 'Queries/users';
import get from 'Utils/get';
export default class HomeCourse extends Component {


    render() {
        return (
            <Query
                query={GET_CURRENT_USER}
            >
                {
                    ({ data, loading }) => {
                        const { history } = this.props;
                        const id = get(data, 'user.id') || '';

                        return (
                            <CourseFollowed history={history} id={id} />
                        );
                    }
                }

            </Query>
        );
    }
}
