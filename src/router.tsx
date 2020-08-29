import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import NotFound from 'components/NotFound';
export interface RouteConfigDeclaration {
  /**
   * 当前路由路径
   */
  path: string;
  /**
   * 当前路由名称
   */
  name?: string;
  /**
   * dva models
   */
  models?: any;
  /**
   * 是否严格匹配路由
   */
  exact?: boolean;
  /**
   * 是否需要路由鉴权
   */
  isProtected?: boolean;
  /**
   * 是否需要路由重定向
   */
  isRedirect?: boolean;
  /**
   * 是否需要动态加载路由
   */
  isDynamic?: boolean;
  /**
   * 动态加载路由时的提示文案
   */
  loadingFallback?: string | React.ReactNode;
  /**
   * 路由组件
   */
  component: any;
  /**
   * 子路由
   */
  routes?: Array<RouteConfigDeclaration>;
}

/** 动态路由配置
 *  获取各个模块router.js配置上下文
 */
// @ts-ignore
const routersContext: any = require['context']('@/pages', true, /router\.ts$/);
// 自动引入 /views 目录下的所有模块
let routersArray = routersContext.keys().map((key: any) => routersContext(key).default);
let mapRouters: RouteConfigDeclaration[] = [];
routersArray.forEach((item: any) => {
  mapRouters = [...mapRouters, ...item];
});

// 设置loading页面
// @ts-ignore
dynamic.setDefaultLoadingComponent(() => <div>loading...</div>);

function RouterConfig(props: any) {
  const { history, app } = props;
  return (
    <Router history={history}>
      <Switch>
        {mapRouters.map(({ path, models, component }, index) => {
          const resolve: any = {
            app,
            models,
            component,
          };
          const Page: any = dynamic(resolve);
          return <Route key={index} path={path} exact component={Page} />;
        })}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
