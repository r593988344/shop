import 'normalize.css/normalize.css';
import './index.less';
import './utils/setRem';
import dva from 'dva';
import routerConfig from './router';
import history from './utils/history';
import createLoading from 'dva-loading';
import globalModal from './models';

const app = dva({
  history,
  onError(error: any) {
    console.log(error);
  },
});

// register routers
app.router(routerConfig);

// register loading
app.use(createLoading());

// register models
app.model(globalModal);

// Start
app.start('#root');
