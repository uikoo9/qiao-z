// service
const service = require('../service/SmsService.js');

/**
 * sms controller
 */
module.exports = (app) => {
  // /sms
  app.post('/sms', (req, res) => {
    service.sms(req, res);
  });
};
