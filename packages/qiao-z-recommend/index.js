// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-recommend');

// controller
const smsController = require('./src/controller/SmsController.js');

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
  smsController(app);
};
