import 'normalize.css/normalize.css';
import './index.less';
import './utils/setRem';
import dva from 'dva';
import './index.less';
import routerConfig from './router';
import { createBrowserHistory } from 'history';
import createLoading from 'dva-loading';

const app = dva({
  history: createBrowserHistory(),
  onError(error: any) {
    console.log(error);
  },
});

// 注册路由
app.router(routerConfig);

app.use(createLoading());
// 自动引入src/models下的所有model
// @ts-ignore
const modelsGlobalContext: any = require['context']('@/models', true, /\.ts$/);
const modelsArray = modelsGlobalContext
  .keys()
  .map((key: any) => modelsGlobalContext(key).default)
  .filter((item: any) => item && item && item.namespace);

modelsArray.forEach((model: any) => {
  app.model(model);
});

// Start
app.start('#root');
