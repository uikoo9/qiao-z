// service
const service = require('../service/UcenterRolemenuService.js');

/**
 * ucenter rolemenu controller
 */
module.exports = (app) => {
  // ucenter rolemenu list
  app.post('/ucenter/rolemenu/list', (req, res) => {
    service.ucenterRolemenuList(req, res);
  });

  // ucenter rolemenu get
  app.post('/ucenter/rolemenu/get', (req, res) => {
    service.ucenterRolemenuGet(req, res);
  });

  // ucenter rolemenu save
  app.post('/ucenter/rolemenu/save', (req, res) => {
    service.ucenterRolemenuSave(req, res);
  });

  // ucenter rolemenu del
  app.post('/ucenter/rolemenu/del', (req, res) => {
    service.ucenterRolemenuDel(req, res);
  });
};
