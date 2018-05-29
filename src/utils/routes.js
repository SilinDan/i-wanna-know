import app from '../index';
import { Route, Link } from 'dva/router';
import Exception from 'ant-design-pro/lib/Exception';
import dynamic from 'dva/dynamic';

function routesCreator(routes = []) {
  const routeComponents = routes.map((route) => {
    const RouteComponent = dynamic({
      app,
      models: route.models ? () => route.models : undefined,
      component: () => route.component,
    });

    return {
      name: route.name,
      Component: (props)=> (
          <Route
            key={route.name}
            path={route.path}
            render={() => <RouteComponent {...props} />}
          />
      ),
    };
  });

  routeComponents.push({
    name: '404',
    Component: ()=> <Route key="404" render={() => <Exception linkElement={Link} type="404" desc="啊，你要找的东西不见啦" />} />
  });

  return routeComponents;
}

export default routesCreator;
