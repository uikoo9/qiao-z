// service
const service = require('../service/UcenterRoleRUserService.js');

/**
 * ucenter role-r-user controller
 */
module.exports = (app) => {
  // ucenter role-r-user list
  app.post('/ucenter/role-r-user/list', (req, res) => {
    service.ucenterRoleRUserList(req, res);
  });

  // ucenter role-r-user get
  app.post('/ucenter/role-r-user/get', (req, res) => {
    service.ucenterRoleRUserGet(req, res);
  });

  // ucenter role-r-user save
  app.post('/ucenter/role-r-user/save', (req, res) => {
    service.ucenterRoleRUserSave(req, res);
  });

  // ucenter role-r-user del
  app.post('/ucenter/role-r-user/del', (req, res) => {
    service.ucenterRoleRUserDel(req, res);
  });
};
