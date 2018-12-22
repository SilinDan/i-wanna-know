import React, { Component } from 'react';
import { Card } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import get from 'Utils/get';
import PropTypes from 'prop-types';
import { formatDate } from 'Utils/utils';
import { withRouter } from 'dva/router';

const propTypes = {

};

function News({ loading, icon, time, title, preview, describe, to, history }) {
  return (
    <Card loading={loading} onClick={() => history.push(to)}>
      <div className="answer-card-dd">
        <div className="flex-between">
          <p className="trends">
            <img src={icon} />
            {describe}
          </p>

          <p className="time">
            {formatDate(time)}
          </p>
        </div>
        <p className="title">
          {title}
        </p>
        <Ellipsis lines={3} className="content">
          {preview}...
        </Ellipsis>

      </div>
    </Card>
  );
}

News.propTypes = propTypes;

export default withRouter(News);
