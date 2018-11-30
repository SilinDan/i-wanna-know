export const SERVER_ADDRESS = 'http://localhost:8080';
export const CLASSIFICATION_ICON_PATH = `${SERVER_ADDRESS}/classificationIcons`;
export const LOGOUT_HREF = __DEV__ ? 'https://cas.zemcho.com/logout?callback=home/Oauth/getToken/appid/iWannaKnow.html' : 'https://cas.dgut.edu.cn/logout?callback=home/Oauth/getToken/appid/iWannaKnow.html';