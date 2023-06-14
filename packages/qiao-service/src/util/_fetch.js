// qiao
import { post as ajaxPost } from 'qiao-ajax';
import { fail } from 'qiao-json';

/**
 * post
 *  url
 *  data
 */
export const post = async (url, data) => {
  return await ajax(url, data);
};

/**
 * postWithToken
 *  url
 *  data
 */
export const postWithToken = async (url, data) => {
  const root = global || window;
  if (!root) return fail('no window or global');

  const userinfo = root.insistime_userinfo;
  if (!userinfo || !userinfo.userid || !userinfo.usertoken) return fail('please login first');

  const headers = {
    userid: userinfo.userid,
    usertoken: userinfo.usertoken,
  };
  return await ajax(url, data, headers);
};

// ajax
async function ajax(url, data, headers) {
  let options = { data: data };
  if (headers) options.headers = headers;

  const s = Date.now();
  let res;
  try {
    res = await ajaxPost(url, options);
  } catch (e) {
    console.log(e);
  }
  const time = Date.now() - s;

  // res error
  if (!res) return fail(`${time}ms | request fail`);

  // not 200
  if (res.status != 200) return fail(`${time}ms | request fail: ${res.status}`);

  // no data
  const json = res.data;
  if (!json) return fail(`${time}ms | request fail: no data`);

  // danger
  if (json.type === 'fail') return fail(`${time}ms | ${json.msg}`);

  json.time = time;
  return json;
}
