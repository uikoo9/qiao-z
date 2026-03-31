// qiao
const { userGoogle } = require('qiao-z-service');

// google
const { getGoogleAuthUrl } = require('../util/google.js');

/**
 * googleAuth
 * @param {*} req
 * @param {*} res
 */
exports.googleAuth = (req, res) => {
  // auth
  const authObj = getGoogleAuthUrl();

  // set cookie
  res.setCookie('state', authObj.state);

  // redirect
  res.redirect(authObj.finalUrl);
};

/**
 * googleCallback
 * @param {*} req
 * @param {*} res
 */
exports.googleCallback = async (req, res) => {
  const methodName = 'googleCallback';

  // fallback url
  const fallbackUrl = global.QZ_CONFIG.google.fallbackUrl;

  // check
  if (!req.cookies) {
    req.logger.error(methodName, 'req.cookies is null');
    res.redirect(fallbackUrl);
    return;
  }
  if (!req.query) {
    req.logger.error(methodName, 'req.query is null');
    res.redirect(fallbackUrl);
    return;
  }

  // check error
  if (req.query.error) {
    req.logger.error(methodName, 'google auth error', req.query.error);
    res.redirect(fallbackUrl);
    return;
  }

  // check state
  const cookieState = req.cookies.state;
  const queryState = req.query.state;
  if (cookieState !== queryState) {
    req.logger.info(methodName, 'cookieState', cookieState);
    req.logger.info(methodName, 'queryState', queryState);
    req.logger.error(methodName, 'cookieState !== queryState');
    res.redirect(fallbackUrl);
    return;
  }

  // check code
  const queryCode = req.query.code;
  if (!queryCode) {
    req.logger.error(methodName, 'queryCode is null');
    res.redirect(fallbackUrl);
    return;
  }

  // send
  const json = await userGoogle({
    url: global.QZ_CONFIG.user.url,
    from: global.QZ_CONFIG.user.from,
    code: queryCode,
  });

  // r
  if (json.type === 'success') {
    // params
    const params = new URLSearchParams(json.obj);
    res.redirect(`${fallbackUrl}?${params.toString()}`);
  } else {
    res.redirect(fallbackUrl);
  }
};
