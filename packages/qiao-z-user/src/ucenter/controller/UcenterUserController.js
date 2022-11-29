// ucenter user
const ucenterUserReg = require("../service/ucenter-user/user-reg.js");
const ucenterUserLogin = require("../service/ucenter-user/user-login.js");
const ucenterUserForget = require("../service/ucenter-user/user-forget.js");
const ucenterUserGet = require("../service/ucenter-user/user-get.js");
const ucenterUserCheck = require("../service/ucenter-user/user-check.js");
const ucenterUserMenus = require("../service/ucenter-user/user-menus.js");
const ucenterCodeSend = require("../service/ucenter-user/code-send.js");

/**
 * ucenter user controller
 */
module.exports = (app) => {
  // ucenter user reg
  app.post("/ucenter/user/reg", (req, res) => {
    ucenterUserReg(req, res);
  });

  // ucenter user login
  app.post("/ucenter/user/login", (req, res) => {
    ucenterUserLogin(req, res);
  });

  // ucenter user forget
  app.post("/ucenter/user/forget", (req, res) => {
    ucenterUserForget(req, res);
  });

  // ucenter user get
  app.post("/ucenter/user/get", (req, res) => {
    ucenterUserGet(req, res);
  });

  // ucenter user check
  app.post("/ucenter/user/check", (req, res) => {
    ucenterUserCheck(req, res);
  });

  // ucenter user menus
  app.post("/ucenter/user/menus", (req, res) => {
    ucenterUserMenus(req, res);
  });

  // ucenter code send
  app.post("/ucenter/code/send", (req, res) => {
    ucenterCodeSend(req, res);
  });
};
