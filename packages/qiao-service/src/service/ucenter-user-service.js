// config
import config from '../util/_server.json';

// fetch
import { post, postWithToken } from '../util/_fetch.js';

// qjson
import { fail } from 'qiao-json';

/**
 * userRegister
 * @param {*} mobile
 * @param {*} password
 * @param {*} repassword
 * @param {*} code
 * @returns
 */
export const userRegister = async (mobile, password, repassword, code) => {
  if (!mobile || !password || !repassword || !code) return fail('need mobile, code, password');
  if (password != repassword) return fail('the two password do not match');

  const url = config.host + config.userRegister;
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
export const userLogin = async (mobile, password) => {
  if (!mobile || !password) return fail('need mobile and password');

  const url = config.host + config.login;
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
export const userCheck = async (userid, usertoken) => {
  if (!userid) return fail('need userid');
  if (!usertoken) return fail('need usertoken');

  const url = config.host + config.userCheck;
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
export const userMenus = async (userid, usertoken) => {
  // check
  if (!userid) return fail('need userid');
  if (!usertoken) return fail('need usertoken');

  // userinfo
  global.insistime_userinfo = {
    userid,
    usertoken,
  };

  // req
  const url = config.host + config.userMenus;
  return await postWithToken(url, {});
};

/**
 * sendCode
 * @param {*} mobile
 * @returns
 */
export const sendCode = async (mobile) => {
  if (!mobile) return fail('need mobile');

  const url = config.host + config.sendCode;
  const data = {
    type: 'reg',
    sign: '坚时科技',
    mobile: mobile,
  };

  return await post(url, data);
};
