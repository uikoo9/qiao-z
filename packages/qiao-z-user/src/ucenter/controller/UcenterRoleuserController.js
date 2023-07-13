// service
const service = require('../service/UcenterRoleuserService.js');

/**
 * ucenter roleuser controller
 */
module.exports = (app) => {
  // ucenter roleuser list
  app.post('/ucenter/roleuser/list', (req, res) => {
    service.ucenterRoleuserList(req, res);
  });

  // ucenter roleuser get
  app.post('/ucenter/roleuser/get', (req, res) => {
    service.ucenterRoleuserGet(req, res);
  });

  // ucenter roleuser save
  app.post('/ucenter/roleuser/save', (req, res) => {
    service.ucenterRoleuserSave(req, res);
  });

  // ucenter roleuser del
  app.post('/ucenter/roleuser/del', (req, res) => {
    service.ucenterRoleuserDel(req, res);
  });
};
