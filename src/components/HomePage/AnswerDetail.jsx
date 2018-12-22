import React, { Component } from 'react';
import { Card } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from './AnswerDetail.less';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import get from 'Utils/get';
import PropTypes from 'prop-types';
import { formatDate } from 'Utils/utils';
import News from 'Components/Common/News';

export default class AnswerDetail extends Component {
    static propTypes = {
        answers: PropTypes.object.isRequired,
        loading: PropTypes.bool,
        history: PropTypes.object.isRequired,
    }

    render() {
        const { answers, loading, history } = this.props;
        const list = answers.list || [];

        return (
            <React.Fragment>
                {
                    list.map((answer) => (
                        <News
                            key={answer._id}
                            describe={`${answer.user.name}回答了问题`}
                            icon={answer.user.icon ? `${SERVER_ADDRESS}/uploads/icons/${answer.user.icon}` : DEFAULT_ICON}
                            time={answer.createdTime}
                            title={answer.question.title}
                            preview={answer.preview}
                            to={`/AnswerDetail/${answer._id}`}
                        />
                    ))
                }
            </React.Fragment>
        );
    }
}
