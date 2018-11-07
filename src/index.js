import dva from 'dva';
import './index.less';
import './styles/common.less';
import './styles/hidden.less';
import browserHistory from 'history/createBrowserHistory';
import hashHistory from 'history/createHashHistory';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import handleError from './utils/errors';
import { SERVER_ADDRESS } from './utils/constance';
import 'ant-design-pro/dist/ant-design-pro.css';

// 1. Initialize
const app = dva({
  history: browserHistory(),
});

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
const client = new ApolloClient({
  uri: `${SERVER_ADDRESS}/graphql`,
  clientState: {
    defaults: {

    },
    typeDefs: `
      input QuestionInput {
          title: String!
          content: String!
          preview: String
          classificationId: ID
      }
    `
  },
  link: ApolloLink.from([
    new HttpLink({ uri: `${SERVER_ADDRESS}/graphql` }),
  ]),
  onError: (({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) {
      handleError(networkError);
    }
  }),
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
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
), document.querySelector('#root'));