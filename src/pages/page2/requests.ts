import myRequest from '@/utils/request';

// 获取首页列表
export async function getPageLists(params: object) {
  return myRequest('get', '/user/addSonUser', params);
}
