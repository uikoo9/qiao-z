// service
const service = require('../service/UserService.js');

/**
 * user controller
 */
module.exports = (app) => {
  // /user/login
  app.post('/user/login', (req, res) => {
    service.userLoginFn(req, res);
  });

  // /user/check
  app.post('/user/check', (req, res) => {
    service.userCheckFn(req, res);
  });
};
