// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-user');

// controller
const userController = require('./src/ucenter/controller/UserController.js');
const ucenterUserController = require('./src/ucenter/controller/UcenterUserController.js');
const ucenterMenuController = require('./src/ucenter/controller/UcenterMenuController.js');
const ucenterRoleController = require('./src/ucenter/controller/UcenterRoleController.js');
const ucenterRolemenuController = require('./src/ucenter/controller/UcenterRolemenuController.js');
const ucenterRoleuserController = require('./src/ucenter/controller/UcenterRoleuserController.js');

/**
 * check auth
 */
exports.checkAuth = require('./src/check/index.js');
exports.checkUserAuth = require('./src/check/check-auth.js').checkUserAuth;
exports.checkUserAuthByReq = require('./src/check/check-auth.js').checkUserAuthByReq;

/**
 * init
 * @param {*} app qz app
 */
exports.init = function (app) {
  // check app
  if (!app) {
    logger.info('init', 'need app');
    return;
  }

  // init controller
  userController(app);
  ucenterUserController(app);
  ucenterMenuController(app);
  ucenterRoleController(app);
  ucenterRolemenuController(app);
  ucenterRoleuserController(app);
};
