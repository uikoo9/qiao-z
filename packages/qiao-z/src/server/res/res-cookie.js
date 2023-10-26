// cookie
import cookie from 'cookie';

/**
 * setCookie
 * @param {*} res
 * @param {*} key
 * @param {*} value
 * @param {*} maxAge
 * @param {*} path
 * @returns
 */
export const setCookie = (res, key, value, maxAge, path) => {
  // check
  if (!res || !key || !value) return;

  res.response.setHeader(
    'Set-Cookie',
    cookie.serialize(key, String(value), {
      maxAge: maxAge || 60 * 60 * 24 * 7, // 1 week
      path: path || '/',
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
