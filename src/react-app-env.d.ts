/// <reference types="react-scripts" />
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'qs' {
  export function stringify(data: any, options?: any): string;
  export function parse(s: string): Object;
}

declare module 'dva-loading' {
  const createLoading: any;
  export default createLoading;
}

declare module 'dva/fetch' {
  const fetch: any;
  export default fetch;
}
