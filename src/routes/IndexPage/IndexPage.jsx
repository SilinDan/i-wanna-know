import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import QuestionList from 'Components/IndexPage/QuestionList';
import AskButton from 'Components/IndexPage/AskButton';
import ClassificationList from 'Components/IndexPage/ClassificationList';

export default class IndexPage extends PureComponent {
  static propTypes = {

  }

  render() {
    return (
      <div className="flex-between">
        <QuestionList></QuestionList>
        <ClassificationList></ClassificationList>
        <AskButton />
      </div>
    );
  }
}
