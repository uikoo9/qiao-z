// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-nuser');

// controller
const userController = require('./src/controller/UserController.js');
const userInfoController = require('./src/controller/UserInfoController.js');
const githubController = require('./src/controller/GithubController.js');

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
};

/**
 * initUserInfo
 * @param {*} app qz app
 */
exports.initUserInfo = function (app) {
  // check app
  if (!app) {
    logger.info('init', 'need app');
    return;
  }

  // init controller
  userInfoController(app);
};

/**
 * initGithub
 * @param {*} app qz app
 */
exports.initGithub = function (app) {
  // check app
  if (!app) {
    logger.info('init', 'need app');
    return;
  }

  // init controller
  githubController(app);
};
