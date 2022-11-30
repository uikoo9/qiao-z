// service
const service = require('../service/UcenterRoleService.js');

/**
 * ucenter role controller
 */
module.exports = (app) => {
  // ucenter role list
  app.post('/ucenter/role/list', (req, res) => {
    service.ucenterRoleList(req, res);
  });

  // ucenter role get
  app.post('/ucenter/role/get', (req, res) => {
    service.ucenterRoleGet(req, res);
  });

  // ucenter role save
  app.post('/ucenter/role/save', (req, res) => {
    service.ucenterRoleSave(req, res);
  });

  // ucenter role del
  app.post('/ucenter/role/del', (req, res) => {
    service.ucenterRoleDel(req, res);
  });
};
