import 'ant-design-pro/dist/ant-design-pro.css';
// import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import dva from 'dva';
import browserHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import './index.less';
import './styles/common.less';
import './styles/hidden.less';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import 'highlight.js';
import { SERVER_ADDRESS } from './utils/constance';
import handleError from './utils/errors';


// 1. Initialize

const app = dva({
  history: browserHistory(),
});

const httpLink = new HttpLink({
  uri: `${SERVER_ADDRESS}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
export const client = new ApolloClient({
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
  link: authLink.concat(httpLink),
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
app.router(require('./router.jsx').default);

// 5. Start
const App = app.start();

ReactDOM.render((
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
), document.querySelector('#root'));