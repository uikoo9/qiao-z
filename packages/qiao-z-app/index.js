// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-app');

// controller
const appController = require('./src/controller/AppController.js');

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
  appController(app);
};
