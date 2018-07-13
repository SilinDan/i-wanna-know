import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionList from 'Components/QuestionList/QuestionList';
import AskButton from 'Components/AskButton/AskButton';
import ClassificationList from 'Components/ClassificationList/ClassificationList';

export default class IndexPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className="flex-between">
          <QuestionList></QuestionList>
          <ClassificationList></ClassificationList>
          <AskButton/>
      </div>
    );
  }
}
