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
  if (!res || !key || !value) return;
  const finalMaxAge = maxAge !== undefined ? maxAge : 60 * 60 * 24 * 7;
  const finalPath = path !== undefined ? path : '/';

  res.response.setHeader(
    'Set-Cookie',
    cookie.serialize(key, String(value), {
      secure: true,
      sameSite: 'none',
      maxAge: finalMaxAge,
      path: finalPath,
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
  const str = cookie.serialize(name, '', {
    secure: true,
    sameSite: 'none',
    expires: new Date(1),
    path: '/',
  });
  res.clearCookies = res.clearCookies || [];
  res.clearCookies.push(str);
};
