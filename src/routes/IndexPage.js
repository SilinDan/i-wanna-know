import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './IndexPage.css';

const GET_DEMO = gql`
  {
    demo @client {
      oneState
    }
  }
`;

function IndexPage(props) {
  return (
    <Query query={GET_DEMO}>
      {
        ({ data: { demo } }) => (
          <div className={styles.normal}>
            <h1 className={styles.title}>{demo.oneState}</h1>
            <div className={styles.welcome} />
            <ul className={styles.list}>
              <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
              <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
            </ul>
          </div>
        )
      }
    </Query>
  );
}

export default (IndexPage);
