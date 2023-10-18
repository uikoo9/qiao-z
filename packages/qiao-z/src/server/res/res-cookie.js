// cookie
import cookie from 'cookie';

/**
 * res.setCookie
 * @param {*} res
 * @param {*} key
 * @param {*} value
 * @returns
 */
export const setCookie = (res, key, value) => {
  // check
  if (!res || !key || !value) return;

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(key, String(value), {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }),
  );
};

/**
 * res.clearCookie
 * @param {*} res
 * @param {*} name
 */
export const clearCookie = (res, name) => {
  // check
  if (!res || !name) return;

  // clear cookies
  const str = cookie.serialize(name, '', { expires: new Date(1), path: '/' });
  res.clearCookies = res.clearCookies || [];
  res.clearCookies.push(str);
};
