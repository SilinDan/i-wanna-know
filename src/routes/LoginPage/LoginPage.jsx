import React, {Component} from 'react';
import PropTypes from 'prop-types';
import request from '../../utils/request';

export default class LoginPage extends Component {
  componentDidMount() {
    if (__DEV__) {
      console.log(this.props);
      // request('https://cas.zemcho.com/home/Oauth/getUserInfo', {
      //   body: JSON.stringify({
      //     access_tocken:
      //   })
      // })
    }
  }

  render() {
    return <div />;
  }
}
