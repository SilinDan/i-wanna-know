import routesCreator from 'Utils/routes';

export default routesCreator([
  {
    name: '首页',
    path: '/index/default',
    component: import('./routes/IndexPage/IndexPage'),
  },
  {
    name: '分类',
    path: '/classification/default',
    component: import('./routes/IndexPage'),
  },
  {
    name: '提问',
    path: '/ask/default',
    component: import('./routes/Ask/Ask'),
  },
]);
