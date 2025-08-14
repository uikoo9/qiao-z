// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-nuser');

// controller
const userController = require('./src/controller/UserController.js');

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
