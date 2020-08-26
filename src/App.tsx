import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import Home from './pages/home';
import { hot } from 'react-hot-loader/root';

// 加载页面
import ActivityIndicator from './components/LoadingPage';
import AppliedRoute from './AppliedRoute';
import NotFound from './components/NotFound';
import './App.less';

// 禁用右键菜单
window.oncontextmenu = function () {
  return false;
};

// loadable 异步加载组件
// 列表页
const LoadableList: React.ReactNode = Loadable({
  loader: () => import('./pages/home'),
  loading: ActivityIndicator,
});

const App = (props: any) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <AppliedRoute props={props} exact path="/home" component={LoadableList} />
      <Route component={NotFound} />
    </Switch>
  );
};

const AppHot = process.env.NODE_ENV === 'development' ? hot(withRouter(App)) : withRouter(App);
export default AppHot;
