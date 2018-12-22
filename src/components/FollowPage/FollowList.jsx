import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Button } from 'antd';
import { DEFAULT_ICON, SERVER_ADDRESS } from 'Utils/constance';
import { withRouter } from 'dva/router';
import './FollowList.less';

class FollowList extends Component {
    static propTypes = {
        users: PropTypes.string.isRequired,
        loading: PropTypes.bool,
    }

    render() {
        const { users, history, loading } = this.props;

        return (
            <List
                loading={loading}
                id="FollowList-dd"
                itemLayout="horizontal"
                dataSource={users}
                renderItem={user => (
                    <List.Item onClick={() => history.push(`/home/${user.id}`)}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={user.icon ? `${SERVER_ADDRESS}/uploads/icons/${user.icon}` : DEFAULT_ICON} />
                            }
                            title={(
                                <div className="flex-follow-dd">
                                    <div>{user.name} </div>
                                    <div className="follow-button"><Button type="primary">+关注</Button></div>
                                </div>
                            )}
                            description={<p><strong>{user.followersNum}</strong>个关注者</p>}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

export default withRouter(FollowList);
