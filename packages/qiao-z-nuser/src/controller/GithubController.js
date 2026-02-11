// service
const service = require('../service/GithubService.js');

/**
 * github controller
 */
module.exports = (app) => {
  // /github/auth
  app.get('/github/auth', (req, res) => {
    service.githubAuth(req, res);
  });
};
