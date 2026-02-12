// qiao
const { userGithub } = require('qiao-z-service');

// github
const { getGitHubAuthUrl } = require('../util/github.js');

/**
 * githubAuth
 * @param {*} req
 * @param {*} res
 */
exports.githubAuth = (req, res) => {
  // auth
  const authObj = getGitHubAuthUrl();

  // set cookie
  res.setCookie('state', authObj.state);

  // redirect
  res.redirect(authObj.finalUrl);
};

/**
 * githubCallback
 * @param {*} req
 * @param {*} res
 */
exports.githubCallback = async (req, res) => {
  const methodName = 'githubCallback';

  // fallback url
  const fallbackUrl = global.QZ_CONFIG.github.fallbackUrl;

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
  const json = await userGithub({
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
