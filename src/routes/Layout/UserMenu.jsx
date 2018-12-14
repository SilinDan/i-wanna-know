import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { client } from '../../index';
import { GET_CURRENT_USER } from 'Queries/users';
import { LOGOUT_HREF } from 'Utils/constance';

const styles = {
  menuItem: {
    minWidth: '160px',
    display: 'block',
  }
};

const menus = (userId) => ([
  {
    name: '我的主页',
    icon: 'user',
    href: `/home/${userId}`,
  },
  // {
  //   name: '个人中心',
  //   icon: 'user',
  //   href: '/user/default',
  // },
  {
    name: '注销',
    icon: 'logout',
    onClick: () => {
      localStorage.removeItem('token');
      location.href = LOGOUT_HREF;
    }
  },
]);

function handleClick(history, href, onClick) {
  if (href && history && history.push) {
    history.push(href);
  }

  if (typeof onClick === 'function') {
    onClick();
  }
}

const UserMenu = (props = { history: {} }) => (
  <Menu>
    {
      menus(props.userId).map((menu) => (
        <Menu.Item key={menu.name}>
          <a
            style={styles.menuItem}
            onClick={() => handleClick(props.history, menu.href, menu.onClick)}>
            {menu.icon ? <Icon type={menu.icon} className="margin-right-sm" /> : null}
            {menu.name}
          </a>
        </Menu.Item>
      ))
    }
  </Menu>
);

export default UserMenu;
