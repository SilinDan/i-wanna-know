import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './AlterInformation.less';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
export default class AlterInformation extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
    }
    render() {

        return (
            <div>
                <div className="AlterButton-dd hidden-mb">
                    <Link to="/user/default">
                        <Button type="primary" className={styles.btn}>
                            修改个人资料
                        </Button>
                    </Link>
                </div>

                {/* 手机端 */}
                <div className="hidden-desktop hidden-tablet">
                    <Link to="/user/default">
                        <Button type="primary" className={styles.btn}>
                            编辑
                        </Button>
                    </Link>
                </div>
            </div >
        );
    }
}
