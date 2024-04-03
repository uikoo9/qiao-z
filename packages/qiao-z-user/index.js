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

/**
 * init
 * @param {*} app express app
 */
exports.init = function (app, config) {
  // check app and config
  if (!app || !config) {
    logger.info('init', 'need app and config');
    return;
  }

  // config
  global.QIAO_USER_CONFIG = config;

  // init controller
  userController(app);
  ucenterUserController(app);
  ucenterMenuController(app);
  ucenterRoleController(app);
  ucenterRolemenuController(app);
  ucenterRoleuserController(app);
};
