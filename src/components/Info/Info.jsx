import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { client } from '../../index';
import { GET_INFORMATION_NUM, GET_INFORMATION } from 'Queries/information';
import { SERVER_ADDRESS, DEFAULT_ICON } from 'Utils/constance';
import { formatDate } from 'Utils/utils';
import { Link } from 'dva/router';

export default class Info extends Component {
  state = {
    informationNum: {
      infoNum: 0,
      inviteNum: 0
    }
  }

  componentDidMount() {
    client.query({
      query: GET_INFORMATION_NUM
    }).then(({ data }) => {
      if (data.informationNum) {
        this.setState({ informationNum: data.informationNum });
      }
    });
  }

  render() {
    const { infoNum, inviteNum } = this.state.informationNum;

    return (
      <Link
        to="/notice/default"
        style={{ color: 'rgba(0, 0, 0, .65)' }}
        className="margin-right-md hidden-mb vertical-center">
        <NoticeIcon
          onItemClick={this.handleItemClick}
          count={infoNum + inviteNum}
        />
      </Link>
    );
  }
}
