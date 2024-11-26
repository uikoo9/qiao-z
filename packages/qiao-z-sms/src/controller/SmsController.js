// service
const service = require('../service/SmsService.js');

/**
 * sms controller
 */
module.exports = (app) => {
  // /user/send-code
  app.post('/user/send-code', (req, res) => {
    service.userSendCode(req, res);
  });
};
