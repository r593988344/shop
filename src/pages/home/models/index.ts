import { getPageLists } from '../requests';
import { Model } from 'dva';

const home: Model = {
  namespace: 'home',

  state: {
    pageList: [],
  },

  effects: {
    *getPageList({ payload }: any, { call, put }: any) {
      const res: any = yield call(getPageLists, payload);
      if (res && res.code === 0) {
        put({
          type: 'savePageList',
          payload: res.data,
        });
      }
    },
  },

  reducers: {
    savePageList(state: any, { payload }: any) {
      return {
        ...state,
        pageList: payload,
      };
    },
  },
};

export default home;
