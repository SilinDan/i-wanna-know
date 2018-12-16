import React, { Component } from 'react';
import { Card } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from './AnswerDetail.less';
import { CLASSIFICATION_ICON_PATH } from 'Utils/constance';

export default class AnswerDetail extends Component {
    render() {
        return (
            <Card>
                <div className="answer-card-dd">
                    <div className="flex-between">
                        <div className="trends">
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            沈丹回答了问题
                        </div>

                        <div className="time">
                            1天前
                        </div>
                    </div>

                    <div className="title">
                        中文转码问题
                    </div>
                    <div className="content">
                        <Ellipsis lines={3}
                        >
                            这个问题我也遇到过，这个是转码的问题。
                            用decodeURI来解码，就可以将JS中的%E8%8B%B1%E8%AF%AD转成“英语”啦😉
                            JS当中的%E8%8B%B1%E8%AF%AD是unicode字符，为什么呢？
                            因为一旦网页的原始编码是什么，一旦被JS编码，都会变成unicode字符。
                            给你延伸拓展一下吧(*^__^*) 嘻嘻……
                            decodeURI 方法
                            描述：简单来说就是从编码到非编码的过程（即解码）
                        </Ellipsis>
                    </div>
                    <div className="questionDescription ">
                        1,0006回答  ·  83,904关注  ·  已关注
                    </div>

                </div>
            </Card>
        );
    }
}
