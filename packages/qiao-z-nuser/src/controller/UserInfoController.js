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

  // /user/search
  app.post('/user/search', (req, res) => {
    service.userSearchFn(req, res);
  });
};
