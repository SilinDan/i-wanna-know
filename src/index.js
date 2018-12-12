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
import Prism from 'prismjs';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup-templating';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import { SERVER_ADDRESS } from './utils/constance';
import handleError from './utils/errors';
import { onError } from 'apollo-link-error';
import './index.less';
import './styles/common.less';
import './styles/hidden.less';

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    handleError(networkError);
  }
});

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
export const client = new ApolloClient({
  clientState: {
    defaults: {

    },
    typeDefs: `
    `
  },
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default app;

// 2. Plugins
// app.use({});
const options = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'React JSX',
      syntax: 'jsx'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Java',
      syntax: 'java',
    }, {
      name: 'PHP',
      syntax: 'php'
    }, {
      name: 'C',
      syntax: 'c'
    }, {
      name: 'C++',
      syntax: 'cpp'
    }
  ]
};

BraftEditor.use(CodeHighlighter(options));

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