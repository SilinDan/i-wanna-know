import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './IndexPage.css';

function IndexPage(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

export default (IndexPage);
