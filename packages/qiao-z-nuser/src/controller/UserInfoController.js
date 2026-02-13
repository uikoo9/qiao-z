// service
const service = require('../service/UserInfoService.js');

/**
 * user info controller
 */
module.exports = (app) => {
  // /user/info
  app.post('/user/info', (req, res) => {
    service.userInfoFn(req, res);
  });
};
