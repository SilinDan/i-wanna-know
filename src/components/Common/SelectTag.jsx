import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './SelectTag.less';

const propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.element,
  isSelected: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

function SelectTag({ tag, text, isSelected, onClick, className, style }) {
  return (
    <span
      onClick={onClick}
      style={style}
      className={`${styles.tag} ${isSelected && styles['selected-tag']} ${className}`}>
      <span className={styles.background} />
      <Icon type="check" className={styles.icon} />
      <span style={{ marginRight: tag ? 8 : 0 }}>{text}</span>
      {tag}
    </span>
  );
}

SelectTag.propTypes = propTypes;

export default SelectTag;
