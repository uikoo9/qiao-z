// service
const service = require('../service/UcenterRoleRMenuService.js');

/**
 * ucenter role-r-menu controller
 */
module.exports = (app) => {
  // ucenter role-r-menu list
  app.post('/ucenter/role-r-menu/list', (req, res) => {
    service.ucenterRoleRMenuList(req, res);
  });

  // ucenter role-r-menu get
  app.post('/ucenter/role-r-menu/get', (req, res) => {
    service.ucenterRoleRMenuGet(req, res);
  });

  // ucenter role-r-menu save
  app.post('/ucenter/role-r-menu/save', (req, res) => {
    service.ucenterRoleRMenuSave(req, res);
  });

  // ucenter role-r-menu del
  app.post('/ucenter/role-r-menu/del', (req, res) => {
    service.ucenterRoleRMenuDel(req, res);
  });
};
