import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar, Button } from 'antd';
import './InformationCard.less';
import DescriptionCollapse from 'Components/HomePage/DescriptionCollapse';
import AlterInformation from 'Components/HomePage/AlterInformation';

const { Meta } = Card;

export default class InformationCard extends Component {

    render() {
        return (
            <div>
                <Card
                // style={{ width: 300 }}
                // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                >

                    <Meta
                        avatar={<Avatar size={84} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={(
                            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
                                <p>沈丹真可爱</p>
                                <AlterInformation />
                            </div>
                        )}


                        description={<DescriptionCollapse />}
                    />

                </Card >
            </div>
        );
    }
}
