const MENUS = [
  {
    name: '首页',
    icon: 'home',
    link: 'index',
  },
  {
    name: '分类',
    icon: 'bars',
    link: 'classification',
    menus: [],
    titles: [],
    links: [],
  },
];

export default MENUS;

export const MOBILE_MENUS = [
  {
    name: '首页',
    icon: 'home',
    link: '/index/default',
  },
  {
    name: '分类',
    icon: 'bars',
    link: '/classification/default',
  },
  {
    name: '我的',
    icon: 'user',
    link: '/mine/default',
  },
];

export const HIDDEN_MOBILE_MENUS = [
  '/ask/default',
];
