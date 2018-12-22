import React from 'react';
import styles from './Loading.less';

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingWrap}>
        <div className={styles.loadingBox}>
          <div className={styles.halfCircle} />
          <div className={styles.halfCircle} />
          <span className={styles.ball} />
          <span className={styles.ball} />
          <span className={styles.ball} />
          <span className={styles.ball} />
        </div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
