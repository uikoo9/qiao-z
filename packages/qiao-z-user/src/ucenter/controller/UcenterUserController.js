// service
const service = require('../service/UcenterUserService.js');

/**
 * ucenter user controller
 */
module.exports = (app) => {
  // ucenter user list
  app.post('/ucenter/user/list', (req, res) => {
    service.ucenterUserList(req, res);
  });

  // ucenter user get
  app.post('/ucenter/user/get', (req, res) => {
    service.ucenterUserGet(req, res);
  });

  // ucenter user save
  app.post('/ucenter/user/save', (req, res) => {
    service.ucenterUserSave(req, res);
  });

  // ucenter user del
  app.post('/ucenter/user/del', (req, res) => {
    service.ucenterUserDel(req, res);
  });
};
