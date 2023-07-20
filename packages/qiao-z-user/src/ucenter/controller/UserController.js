// user
const userReg = require('../service/user/user-reg.js');
const userLogin = require('../service/user/user-login.js');
const userForget = require('../service/user/user-forget.js');
const userMenus = require('../service/user/user-menus.js');
const codeSend = require('../service/user/code-send.js');

/**
 * user controller
 */
module.exports = (app) => {
  // user reg
  app.post('/user/reg', (req, res) => {
    userReg(req, res);
  });

  // user login
  app.post('/user/login', (req, res) => {
    userLogin(req, res);
  });

  // user forget
  app.post('/user/forget', (req, res) => {
    userForget(req, res);
  });

  // user menus
  app.post('/user/menus', (req, res) => {
    userMenus(req, res);
  });

  // code send
  app.post('/code/send', (req, res) => {
    codeSend(req, res);
  });
};
