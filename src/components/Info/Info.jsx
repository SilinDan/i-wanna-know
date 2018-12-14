import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { client } from '../../index';
import { GET_INFORMATION_NUM, GET_INFORMATION } from 'Queries/information';
import { SERVER_ADDRESS } from 'Utils/constance';
import { formatDate } from 'Utils/utils';
import { Link } from 'dva/router';

export default class Info extends Component {
  static propTypes = {

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
    },
    info: {
      list: [],
      total: 0,
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

    this.fetchInformation();
  }

  resolveInformation = (list) => {
    return list.map((information) => {
      const info = {
        id: information._id,
        avatar: `${SERVER_ADDRESS}/uploads/icons/${information.user.icon}`,
        title: information.question.title,
        datetime: formatDate(information.time),
      };
      const user = information.user;

      switch (information.type) {
        case 'Answer': {
          info.title = (
            <h4>
              <Link to={`/home/${user.id}`}>{user.name}</Link>
              回答了你的
              <Link to={`/question/${information.question._id}`}>{information.question.title}</Link>
              问题
            </h4>
          );
          break;
        }
        case 'Like': {
          info.title = (
            <h4>
              <Link to={`/home/${user.id}`}>{user.name}</Link>
              喜欢了你在问题
              <Link to={`/question/${information.question._id}`}>{information.question.title}</Link>
              下的回答
            </h4>
          );
          break;
        }
        case 'Follow': {
          info.title = (
            <h4>
              <Link to={`/home/${user.id}`}>{user.name}</Link>关注了你
            </h4>
          );
          break;
        }
        case 'Reply': {
          info.title = (
            <h4>
              <Link to={`/home/${user.id}`}>{user.name}</Link>回复了你
            </h4>
          );
          info.description = information.reply.content;
          break;
        }

      }

      return info;

    });
  }

  fetchInformation = () => {
    client.query({
      query: GET_INFORMATION,
      variables: {
        type: ['Answer', 'Reply', 'Follow', 'Like']
      }
    }).then(({ data }) => {
      if (data.information) {
        this.setState({
          info: {
            list: this.resolveInformation(data.information.list)
          },
          total: data.information.total
        });
      }
    });
  }

  render() {
    const { infoNum, inviteNum } = this.state.informationNum;
    const { info } = this.state;

    return (
      <NoticeIcon
        onItemClick={(item) => console.log(item)}
        count={infoNum + inviteNum}
        className="margin-right-md hidden-mb vertical-center" >
        <NoticeIcon.Tab
          list={info.list}
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
