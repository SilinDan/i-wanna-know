import dva from 'dva';
import './index.less';
import './styles/common.less';
import './styles/hidden.less';
import browserHistory from 'history/createBrowserHistory';
import { Component } from 'react';
import { is } from 'immutable';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import 'ant-design-pro/dist/ant-design-pro.css';

// 1. Initialize
const app = dva({
  history: browserHistory(),
});

Component.shouldComponentUpdate = (nextProps, nextState) => {
  return !(this.props === nextProps || is(this.props, nextProps)) ||
         !(this.state === nextState || is(this.state, nextState));
};

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
const client = new ApolloClient({
  clientState: {
    defaults: {
      demo: {
        oneState: 'Hello Windlike',
        __typename: 'Demo',
      },
      todos: [{
        id: 0,
        completed: false,
        text: 'TODO',
        __typename : 'Todo',
      }],
      visibilityFilter: 'SHOW_ALL',
    },
    typeDefs: `
      type Demo {
        oneState: String
      }

      type Query {
        demo: Demo
        visibilityFilter: String
      }

      type Todo {
        id: int
        completed: bool
        text: String
      }
    `
  },
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

export default app;

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/demo').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
const App = app.start();

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
), document.querySelector('#root'));
