import React, { Component } from 'react';
import { Button } from 'antd';

class Comment extends Component {
    state = {};
    render() {
        return (
            <div>
                <input type="text" /><Button>评论</Button>
            </div>
        );
    }
}

export default Comment;
