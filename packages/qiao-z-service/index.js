'use strict';

var qiaoAjax = require('qiao-ajax');
var qiaoJson = require('qiao-json');
var qiao_log_js = require('qiao.log.js');

var host = 'https://api.vincentqiao.com/';
var userRegister$1 = 'user/reg';
var userLogin$1 = 'user/login';
var userCheck$1 = 'user/check';
var userMenus$1 = 'user/menus';
var sendCode$1 = 'code/send';
var config = {
  host: host,
  userRegister: userRegister$1,
  userLogin: userLogin$1,
  userCheck: userCheck$1,
  userMenus: userMenus$1,
  sendCode: sendCode$1,
};

// qiao
const logger = qiao_log_js.Logger('qiao-service');

/**
 * post
 *  url
 *  data
 */
const post = async (url, data) => {
  return await ajax(url, data);
};

/**
 * postWithToken
 *  url
 *  data
 */
const postWithToken = async (url, data) => {
  const root = global || window;
  if (!root) return qiaoJson.fail('no window or global');

  const userinfo = root.insistime_userinfo;
  if (!userinfo || !userinfo.userid || !userinfo.usertoken) return qiaoJson.fail('please login first');

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
    res = await qiaoAjax.post(url, options);
  } catch (e) {
    logger.info('ajax', e);
  }
  const time = Date.now() - s;

  // res error
  if (!res) return qiaoJson.fail(`${time}ms | request fail`);

  // not 200
  if (res.status != 200) return qiaoJson.fail(`${time}ms | request fail: ${res.status}`);

  // no data
  const json = res.data;
  if (!json) return qiaoJson.fail(`${time}ms | request fail: no data`);

  // danger
  if (json.type !== 'success') return qiaoJson.fail(`${time}ms | ${json.msg}`);

  json.time = time;
  return json;
}

// config

/**
 * userRegister
 * @param {*} mobile
 * @param {*} password
 * @param {*} repassword
 * @param {*} code
 * @returns
 */
const userRegister = async (mobile, password, repassword, code, host) => {
  if (!mobile || !password || !repassword || !code) return qiaoJson.fail('need mobile, code, password');
  if (password != repassword) return qiaoJson.fail('the two password do not match');

  const url = (host || config.host) + config.userRegister;
  const data = {
    username: mobile,
    password: password,
    usercode: code,
  };

  return await post(url, data);
};

/**
 * userLogin
 * @param {*} mobile
 * @param {*} password
 * @returns
 */
const userLogin = async (mobile, password, host) => {
  if (!mobile || !password) return qiaoJson.fail('need mobile and password');

  const url = (host || config.host) + config.userLogin;
  const data = {
    username: mobile,
    password: password,
  };

  return await post(url, data);
};

/**
 * userCheck
 * @param {*} userid
 * @param {*} usertoken
 * @returns
 */
const userCheck = async (userid, usertoken, host) => {
  if (!userid) return qiaoJson.fail('need userid');
  if (!usertoken) return qiaoJson.fail('need usertoken');

  const url = (host || config.host) + config.userCheck;
  const data = {
    userid: userid,
    usertoken: usertoken,
  };

  return await post(url, data);
};

/**
 * userMenus
 * @param {*} userid
 * @param {*} usertoken
 * @returns
 */
const userMenus = async (userid, usertoken, host) => {
  // check
  if (!userid) return qiaoJson.fail('need userid');
  if (!usertoken) return qiaoJson.fail('need usertoken');

  // userinfo
  global.insistime_userinfo = {
    userid,
    usertoken,
  };

  // req
  const url = (host || config.host) + config.userMenus;
  return await postWithToken(url, {});
};

/**
 * sendCode
 * @param {*} mobile
 * @returns
 */
const sendCode = async (mobile, host) => {
  if (!mobile) return qiaoJson.fail('need mobile');

  const url = (host || config.host) + config.sendCode;
  const data = {
    type: 'reg',
    sign: '坚时科技',
    mobile: mobile,
  };

  return await post(url, data);
};

exports.sendCode = sendCode;
exports.userCheck = userCheck;
exports.userLogin = userLogin;
exports.userMenus = userMenus;
exports.userRegister = userRegister;
