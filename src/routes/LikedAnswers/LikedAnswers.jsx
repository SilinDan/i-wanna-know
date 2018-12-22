import React from 'react';
import PropTypes from 'prop-types';
import LikedAnswersList from 'Components/LikedAnswers/LikedAnswersList';

const propTypes = {

};

function LikedAnswers(props) {
  const { userId } = props.match.params;
  const history = props.history;

  return (
    <LikedAnswersList userId={userId} history={history} />
  );
}

LikedAnswers.propTypes = propTypes;

export default LikedAnswers;
