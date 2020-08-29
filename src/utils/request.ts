import fetch from 'dva/fetch';
import { stringify } from 'qs';

interface Extend {
  requestType?: string;
  header?: object;
  isForm?: boolean;
}

const urlConfig = {
  local: '/dev',
  pro: '/pro',
};

// 区分开发环境和生产环境的 baseUrl
let apiPrefixes: string;
switch (process.env.NODE_ENV) {
  case 'development':
    apiPrefixes = urlConfig.local;
    break;
  case 'production':
    apiPrefixes = urlConfig.pro;
    break;
  default:
    apiPrefixes = urlConfig.pro;
}

const checkStatus = (response: any) => {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  //
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
};

const request = (url: string, opt?: object) => {
  return fetch(url, opt)
    .then(checkStatus)
    .then((data: any) => ({ data }))
    .catch((err: any) => ({ err }));
};

const myRequest = (
  method: string,
  url: string,
  params: object,
  extend: Extend = { requestType: 'json', header: {}, isForm: true },
) => {
  let fullPath = apiPrefixes + url;
  // http 开头直接使用
  if (/^https?:\/\//.test(url)) {
    fullPath = url;
  }
  const parsedMethod = method.toLowerCase();

  if (parsedMethod === 'get') {
    return request(`${fullPath}?${stringify(params)}`).then(checkStatus);
  }

  if (parsedMethod === 'post') {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return request(fullPath, {
      method: 'POST',
      requestType: extend.requestType,
      body: extend.isForm ? params : stringify(params),
      headers: { ...headers, ...extend.header },
    }).then(checkStatus);
  }
  return false;
};

export default myRequest;
