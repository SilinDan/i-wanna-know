import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './AlterInformation.less';

export default class AlterInformation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="AlterButton-dd">
                <a href="#" >
                    <Button type="primary" className={styles.btn}>
                        修改个人资料
                    </Button>
                </a>
            </div>
        );
    }
}
