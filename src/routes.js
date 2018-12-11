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
    component: import('./routes/Classification/Classification'),
  },
  {
    name: '提问',
    path: '/ask/:_id',
    component: import('./routes/Ask/Ask'),
  },
  {
    name: '问题详情',
    path: '/question/:_id',
    component: import('./routes/QuestionDetail/QuestionDetail'),
  },
  {
    name: '用户信息',
    path: '/user/default',
    component: import('./routes/UserPage/UserPage'),
  },
  {
    name: '我的主页',
    path: '/home/default',
    component: import('./routes/HomePage/HomePage'),
  },
  {
    name: '手机我的个人中心',
    path: '/mine/default',
    component: import('./routes/MinePage/MinePage'),
  },
  {
    name: '课程详情',
    path: '/course/:_id',
    component: import('./routes/CourseDetail/CourseDetail'),
  },
  {
    name: '通知页列表',
    path: '/notice/default',
    component: import('./routes/NoticeDetail/NoticeDetail'),
  },
  {
    name: '关注页列表',
    path: '/follow/default',
    component: import('./routes/FollowDetail/FollowDetail'),
  },
]);
