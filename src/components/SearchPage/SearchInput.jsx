import React, { Component } from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import PropTypes from 'prop-types';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const dataSource = [{
    title: '课程',
    children: [{
        title: 'AntDesign',
        count: 10000,
    }, {
        title: 'AntDesign UI',
        count: 10600,
    }],
}, {
    title: '问题',
    children: [{
        title: 'AntDesign UI 有多好',
        count: 60100,
    }, {
        title: 'AntDesign 是啥',
        count: 30010,
    }],
}];

function renderTitle(title) {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href="/search/:word"
                target="_blank"
                rel="noopener noreferrer"
            >更多
        </a>
        </span>
    );
}
const options = dataSource.map(group => (
    <OptGroup
        key={group.title}
        label={renderTitle(group.title)}
    >
        {group.children.map(opt => (
            <Option key={opt.title} value={opt.title}>
                {opt.title}
                <span className="certain-search-item-count">{opt.count} 人 关注</span>
            </Option>
        ))}
    </OptGroup>
)).concat([
    <Option disabled key="all" className="show-all">
        <a
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
            查看所有结果
      </a>
    </Option>,
]);

export default class SearchInput extends Component {
    static propTypes = {
        word: PropTypes.string,
        history: PropTypes.object.isRequired,
    }
    state = {
        word: ''
    }

    goToSearch = (e) => {

        this.props.history.replace(`/search/${e.target.value}`);
    }

    render() {
        console.log(this.props.word);

        return (
            <div className="certain-category-search-wrapper" style={{ width: '100%' }}>

                <Input
                    defaultValue={this.props.word}
                    onPressEnter={this.goToSearch}
                    suffix=
                    {
                        <Icon type="search"
                            className="certain-category-icon"
                        />
                    }
                />
            </div>
        );
    }

}