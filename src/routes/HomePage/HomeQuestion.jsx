/** 用户发布的问题 */
import React from 'react';
import QuestionList from 'Components/IndexPage/QuestionList';

function HomeQuestion(props) {
  const userId = props.match.params.userId;

  return (
    <QuestionList userId={userId} />
  );
}

export default HomeQuestion;
