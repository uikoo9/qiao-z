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
