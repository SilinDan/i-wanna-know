import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { client } from '../../index';
import { GET_INFORMATION_NUM } from 'Queries/information';

export default class Info extends Component {
  static propTypes = {
    infoNum: PropTypes.number.isRequired,
    infoList: PropTypes.array.isRequired,
    messageList: PropTypes.array.isRequired,
  }

  static defaultProps = {
    infoNum: 0,
    infoList: [],
    messageList: [],
  }

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
      <NoticeIcon
        count={infoNum + inviteNum}
        className="margin-right-md hidden-mb vertical-center" >
        <NoticeIcon.Tab
          list={[]}
          title="消息"
          emptyText="没有新的消息"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
        <NoticeIcon.Tab
          list={[]}
          title="邀请"
          emptyText="没有新的邀请"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        />
      </NoticeIcon>
    );
  }
}
