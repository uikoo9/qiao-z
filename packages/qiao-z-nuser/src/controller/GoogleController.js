// service
const service = require('../service/GoogleService.js');

/**
 * google controller
 */
module.exports = (app) => {
  // /google/auth
  app.get('/google/auth', (req, res) => {
    service.googleAuth(req, res);
  });

  // /google/callback
  app.get('/google/callback', (req, res) => {
    service.googleCallback(req, res);
  });
};
