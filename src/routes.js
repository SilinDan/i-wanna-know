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
    name: '动态',
    path: '/news/default',
    component: import('./routes/News/News'),
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
    name: '回答详情',
    path: '/AnswerDetail/:_id',
    component: import('./routes/AnswerDetail/AnswerDetail'),
  },
  {
    name: '用户信息',
    path: '/user/default',
    component: import('./routes/UserPage/UserPage'),
  },
  {
    name: '我的主页',
    path: '/home/:userId',
    component: import('./routes/HomePage/HomePage'),
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
    path: '/follow/:userId',
    component: import('./routes/FollowDetail/FollowDetail'),
  },
  {
    name: '搜索结果',
    path: '/search/:word',
    component: import('./routes/SearchResult/SearchResult'),
  },
  {
    name: '手机我的个人中心',
    path: '/mine/default',
    component: import('./routes/MinePage/MinePage'),
  },
  {
    name: '手机端关注课程',
    path: '/HomeCourse/:userId',
    component: import('./routes/HomePage/HomeCourse'),
  },
  {
    name: '手机端动态',
    path: '/HomeTrends/:userId',
    component: import('./routes/HomePage/HomeTrends'),
  },
  {
    name: '手机端关注问题',
    path: '/HomeFollowedQuestion/:userId',
    component: import('./routes/HomePage/HomeFollowedQuestion'),
  },
  {
    name: '手机端用户的问题',
    path: '/HomeQuestion/:userId',
    component: import('./routes/HomePage/HomeQuestion'),
  },
  {
    name: '手机端回答',
    path: '/HomeAnswer/:userId',
    component: import('./routes/HomePage/HomeAnswer'),
  },
  {
    name: '喜欢的回答',
    path: '/LikedAnswers/:userId',
    component: import('./routes/LikedAnswers/LikedAnswers'),
  },
]);
